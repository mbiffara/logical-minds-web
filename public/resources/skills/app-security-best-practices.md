---
name: app-security-best-practices
description: Use when building or reviewing app features that involve authentication, user roles, user data, APIs, file uploads, webhooks, OAuth, or multi-tenant data — enforces auth/authz done right (JWT handling, server-side role checks, object-level ownership), input validation, safe data exposure, and privacy-by-default.
---

# App Security Best Practices

You are building or reviewing an application feature. Apply these rules as hard requirements, not suggestions. When you find a violation in existing code, flag it and fix it before adding new functionality on top.

The golden rule behind everything below: **the client is enemy territory.** Anything the browser sends can be forged; anything the browser receives can be read. Every security decision happens on the server.

## 1. Authentication

- **Access tokens are short-lived** (minutes to hours, not days). Pair them with a refresh token that rotates on use; a stolen refresh token that gets reused should invalidate the whole session family.
- **Store tokens in `httpOnly`, `Secure`, `SameSite` cookies** — not in `localStorage` or `sessionStorage`, where any XSS can exfiltrate them. If a SPA truly needs in-memory tokens, keep them out of persistent storage entirely.
- **Always verify the signature AND the expiry** of a JWT on every request. Never accept `alg: none`. Pin the algorithm server-side instead of trusting the token header.
- **Never put secrets or sensitive data in a JWT payload** — it is base64, not encrypted. Anyone with the token can read it.
- **Hash passwords with bcrypt or argon2** (never MD5/SHA — those are speed-optimized, which is the opposite of what you want). Salting is built in; don't roll your own.
- **Rate-limit login and password-reset endpoints** and return the same response for "wrong password" and "no such user" so accounts can't be enumerated.
- **Invalidate sessions on password change** and offer "log out everywhere".

## 2. Authorization

- **Hiding UI is UX, not security.** Not rendering the admin button for non-admins is correct — users shouldn't see actions they can't take — but it protects nothing. The API endpoint behind that button must check the role itself, every time.
- **Decide on the server, render on the server.** For role-dependent pages, do the role check server-side and never ship admin-only data or markup to a non-admin client. Filtering rows in client code means the data already crossed the wire and lives in the response payload.
- **Deny by default.** Every route/endpoint is unauthorized until a check explicitly passes. New endpoints must never launch open because someone forgot the middleware — put authz in a central layer (middleware, route guard, decorator), not copy-pasted per handler.
- **Check ownership, not just role** (the #1 real-world hole — IDOR). `GET /invoices/4832` must verify that invoice 4832 belongs to the requesting user. A valid session for user A must never read or mutate user B's resources just by changing an ID.
- **Never trust identity or role fields from the request.** The user ID comes from the verified session/token, never from the body, query, or a hidden form field. Reject payloads that try to set `role`, `isAdmin`, `userId`, or prices/totals computed client-side.
- **Return 404 (not 403) for resources the user shouldn't know exist**, so attackers can't map which IDs are real.

## 3. API & Input Handling

- **Validate every input on the server** with a schema (zod, joi, or equivalent): type, length, range, format. Client-side validation is a UX courtesy that attackers skip with one curl command.
- **Whitelist writable fields** on create/update (explicit `pick`, DTOs) instead of spreading `req.body` into the database — mass assignment is how users promote themselves to admin.
- **Cap and paginate every list endpoint.** No `?limit=1000000`.
- **Return generic error messages** to clients; log the detailed stack trace server-side. Internal paths, SQL fragments, and library versions in error responses are reconnaissance gifts.
- **Rate-limit by user and by IP** on expensive or abusable endpoints (auth, search, email-sending, exports).

## 4. Frontend Hygiene

- **Nothing secret ships to the browser.** Any env var exposed to the client bundle (e.g. `NEXT_PUBLIC_*`, `VITE_*`) is public. API keys with billing or write power live server-side only, behind your own endpoint.
- **Escape output; treat `dangerouslySetInnerHTML` (and equivalents) as a code smell.** If rich text is a requirement, sanitize server-side with an allowlist library.
- **No sensitive data in URLs** — query strings end up in logs, browser history, and Referer headers. Tokens and PII travel in headers or bodies.
- **Use CSRF protection when auth lives in cookies**: `SameSite=Lax`/`Strict` plus a CSRF token for state-changing requests.

## 5. Secrets, Transport & Headers

- **Secrets live in environment variables or a secrets manager**, never in the repo. Different values per environment; rotate anything that ever leaked, immediately.
- **HTTPS everywhere, with HSTS.** Redirect HTTP; cookies get the `Secure` flag.
- **Set the boring headers** — they're one middleware away: `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy`.
- **CORS is an allowlist**, never `*` together with credentials. List exact origins per environment.

## 6. Database

- **Parameterized queries or an ORM, always.** String-concatenated SQL is an injection, full stop.
- **The app's DB user gets least privilege** — no DDL, no superuser. A compromised app should not be able to drop tables.
- **Hash what you verify (passwords), encrypt what you must read back (tokens, keys), store neither if you can avoid it.** Card data belongs in your payment provider's vault, not your schema.

## 7. Audit & Monitoring

- **Write an audit log for sensitive actions** — logins, permission changes, deletions, exports, payment events — with who, what, when, from where.
- **Never log credentials, tokens, or full PII.** Mask before logging.
- **Alert on anomalies**: bursts of failed logins, 403/404 spikes (someone probing IDs), traffic from new locations on admin accounts.

## 8. File Uploads

- **Validate by content, not by name.** Check magic bytes / re-parse the file server-side; the extension and the client-sent `Content-Type` are attacker-controlled. Enforce size and count limits before buffering the whole body.
- **Never trust the original filename.** Generate a random name and store the original only as metadata — `../../etc/cron.d/x` is a path, not a filename.
- **Store uploads outside the web root** (object storage like S3), never somewhere the server might execute them. Serve through signed URLs or a proxy endpoint that re-checks authorization.
- **Serve with safe headers**: correct `Content-Type`, `Content-Disposition: attachment` for anything not meant to render, and `X-Content-Type-Options: nosniff`. An uploaded "image" that's actually HTML becomes stored XSS the moment it renders on your domain.
- **Re-encode images and strip EXIF** (location data is PII). If users share files with other users, scan or sandbox them first.

## 9. Webhooks

- **Verify the signature of every incoming webhook** (HMAC with the provider's secret) using a timing-safe comparison. No valid signature, no processing — a webhook endpoint without verification is an open API that writes to your database.
- **Defend against replays**: enforce a timestamp tolerance window and deduplicate by event ID. Providers retry, attackers replay — your handler must be idempotent either way.
- **Acknowledge fast, process async.** Return 2xx quickly and queue the work; slow handlers cause retry storms that double-process.
- **Treat the payload as a hint, not the truth.** For anything consequential, fetch the authoritative state from the provider's API by ID instead of trusting the pushed body.
- **One webhook secret per environment**, rotated like any credential.

## 10. OAuth & Social Login

- **Authorization code flow with PKCE, always.** The implicit flow is deprecated for good reasons.
- **Validate `state` (CSRF) and `nonce` (token replay)** on the callback, and register exact redirect URIs — no wildcards, no open redirects.
- **Verify the ID token properly**: signature against the provider's JWKS, plus issuer, audience, and expiry. Don't just decode it.
- **Link accounts only via verified emails.** Auto-linking an OAuth identity to an existing account by unverified email lets an attacker who controls that email at the provider take over the account.
- **Request minimal scopes**, and store provider access/refresh tokens encrypted server-side — they are credentials, not profile data.

## 11. Multi-Tenancy

- **The tenant ID comes from the authenticated session, never from the request.** A `tenantId` in the body, query, or header is user A choosing to be tenant B.
- **Scope every query by tenant, centrally.** Use an ORM global filter, repository-layer injection, or Postgres row-level security — not a `where` clause each developer must remember. The forgotten `where` is the breach.
- **Off-request paths leak too**: background jobs, caches, search indexes, and file paths all need tenant scoping. Cache keys without a tenant prefix serve one customer's data to another.
- **Make uniqueness tenant-scoped** (`unique(tenant_id, email)`, not `unique(email)`) and write at least one explicit cross-tenant access test: log in as tenant A, request tenant B's resource ID, expect 404.

## 12. Privacy & Data Retention

- **Collect only what the feature needs.** Every PII field is liability; if you don't store it, you can't leak it. Know which columns are PII and document them in the schema.
- **Bound retention.** Define how long each data class lives, then enforce it with an automated purge/anonymize job — a policy without a cron job is a wish.
- **Honor deletion and export end-to-end**: primary DB, logs, analytics, search indexes, backups' expiry, and third-party processors. "Deleted" that survives in five other systems isn't deleted.
- **Get consent before tracking**, and keep marketing/analytics cookies off until it's given.
- **Encrypt PII at rest where practical and mask it everywhere else** — logs, error trackers, support tools, LLM prompts.

## Review Checklist

When reviewing a feature, walk this list and mark each item pass/fail with the file and line:

1. Every new endpoint has an explicit authz check (role AND ownership where applicable).
2. No decision made in the UI is missing its server-side twin.
3. All inputs schema-validated server-side; writable fields whitelisted.
4. Tokens/cookies configured `httpOnly` + `Secure` + `SameSite`; no tokens in web storage.
5. No secrets in client code, URLs, or logs.
6. Errors are generic outward, detailed inward.
7. Sensitive actions are rate-limited and audit-logged.
8. Uploads validated by content, stored outside the web root, served with safe headers behind an authz check.
9. Webhook handlers verify signatures, dedupe by event ID, and are idempotent.
10. OAuth callbacks validate `state`/`nonce`; accounts link only via verified emails.
11. Every query, job, cache key, and index in multi-tenant code is tenant-scoped from the session.
12. PII is minimized, retention-bounded, and covered by working delete/export flows.

---

*Shared for free by [Logical Minds](https://www.logicalminds.co) — a product agency shipping software with human + AI teams.*
