import { NextResponse } from "next/server";

const NOTION_API_KEY = process.env.NOTION_API_KEY ?? "";
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID ?? "";

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
/* Resend requires the `from` domain to be verified in your Resend account.
   Override via env once logicalminds.co is verified. */
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Logical Minds <onboarding@resend.dev>";
const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL ?? "marcelo@logicalminds.co";

/* Map form service keys → human-readable values */
const serviceMap: Record<string, string> = {
  productDev: "Product Discovery",
  uxDesign: "UX/UI Design",
  fullstack: "Full-Stack Development",
  qa: "QA & Testing",
  cloud: "Cloud & Infrastructure",
  aiIntegration: "AI Integration",
  mvp12weeks: "MVP in 12 Weeks",
};

const budgetMap: Record<string, string> = {
  under10k: "< $10K",
  "10k25k": "$10K - $25K",
  "25k50k": "$25K - $50K",
  "50k100k": "$50K - $100K",
  over100k: "> $100K",
};

const deadlineMap: Record<string, string> = {
  asap: "ASAP",
  "1month": "1 month",
  "1to3months": "1-3 months",
  "3to6months": "3-6 months",
  flexible: "Flexible",
};

interface ContactBody {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  deadline?: string;
  message?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* Send the submission to the team inbox via Resend.
   Throws on failure so the caller can surface an error to the user. */
async function sendEmail(body: ContactBody): Promise<void> {
  if (!RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY");
  }

  const rows: Array<[string, string | undefined]> = [
    ["Name", body.name],
    ["Email", body.email],
    ["Company", body.company],
    ["Phone", body.phone],
    ["Service", body.service ? serviceMap[body.service] ?? body.service : undefined],
    ["Budget", body.budget ? budgetMap[body.budget] ?? body.budget : undefined],
    ["Deadline", body.deadline ? deadlineMap[body.deadline] ?? body.deadline : undefined],
    ["Message", body.message],
  ];

  const visibleRows = rows.filter(([, val]) => val);

  const html = `
    <div style="font-family: system-ui, sans-serif; color: #0a0a0f; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">New contact form submission</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
        ${visibleRows
          .map(
            ([label, val]) => `
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: 600; vertical-align: top; white-space: nowrap;">${label}</td>
            <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${escapeHtml(
              String(val),
            )}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>
  `;

  const text = visibleRows.map(([label, val]) => `${label}: ${val}`).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: body.email,
      subject: `New contact: ${body.name}${body.company ? ` (${body.company})` : ""}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend API error: ${res.status} ${err}`);
  }
}

/* Best-effort write to Notion. Never throws — logs and returns on failure. */
async function saveToNotion(body: ContactBody): Promise<void> {
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) return;

  const properties: Record<string, unknown> = {
    Name: { title: [{ text: { content: body.name } }] },
    Email: { email: body.email },
    Status: { select: { name: "New" } },
    Source: { select: { name: "Website" } },
  };

  if (body.company) {
    properties.Company = { rich_text: [{ text: { content: body.company } }] };
  }
  if (body.phone) {
    properties.Phone = { phone_number: body.phone };
  }
  if (body.service && serviceMap[body.service]) {
    properties.Service = { select: { name: serviceMap[body.service] } };
  }
  if (body.budget && budgetMap[body.budget]) {
    properties.Budget = { select: { name: budgetMap[body.budget] } };
  }
  if (body.deadline && deadlineMap[body.deadline]) {
    properties.Deadline = { select: { name: deadlineMap[body.deadline] } };
  }
  if (body.message) {
    properties.Message = { rich_text: [{ text: { content: body.message } }] };
  }

  try {
    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties,
      }),
    });

    if (!res.ok) {
      console.error("Notion API error:", await res.json());
    }
  } catch (err) {
    console.error("Notion save error:", err);
  }
}

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 },
      );
    }

    // Primary: email the submission to the team inbox.
    await sendEmail(body);

    // Secondary (best-effort): persist to Notion if configured.
    await saveToNotion(body);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to submit" },
      { status: 500 },
    );
  }
}
