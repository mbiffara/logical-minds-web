import { NextResponse } from "next/server";

const NOTION_API_KEY = process.env.NOTION_API_KEY!;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID!;

/* Map form service keys → Notion select values */
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

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 },
      );
    }

    const properties: Record<string, unknown> = {
      Name: { title: [{ text: { content: body.name } }] },
      Email: { email: body.email },
      Status: { select: { name: "New" } },
      Source: { select: { name: "Website" } },
    };

    if (body.company) {
      properties.Company = {
        rich_text: [{ text: { content: body.company } }],
      };
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
      properties.Message = {
        rich_text: [{ text: { content: body.message } }],
      };
    }

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
      const err = await res.json();
      console.error("Notion API error:", err);
      return NextResponse.json(
        { error: "Failed to submit" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
