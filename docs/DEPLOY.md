# Private Website Studio — Vercel deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fr-pedro17%2Fopen-lovable)

## Required configuration

1. Import the repository into Vercel as a Next.js project.
2. Configure production environment variables:
   - `STUDIO_USERNAME`: private studio login
   - `STUDIO_PASSWORD`: long, random secret; never expose as NEXT_PUBLIC_*
   - `FIRECRAWL_API_KEY`: Firecrawl scraping and screenshots
   - `SANDBOX_PROVIDER=vercel`
3. Enable AI Gateway for your Vercel project. The AI SDK supports project OIDC
   authentication without provider keys when using plain string model IDs.
   **The upstream repository has legacy direct-provider routes; not all routes
   currently use keyless Gateway auth.** For initial testing, configure
   `AI_GATEWAY_API_KEY` if those routes require it.
4. Set Gateway key spending limits in the Vercel dashboard (if using a key),
   monitor Sandbox usage, and do not enable automatic credit top-ups.
5. Keep deployment access restricted. The Basic Auth gate in middleware protects
   the Next.js app but does not protect separately exposed Sandbox preview URLs.
6. Test: private login, scraping, AI generation, sandbox preview, exported files.
   Confirm actual usage, not just successful build output.

## Security and isolation status

This is a **single-operator deployment**. Upstream stores sandbox and conversation
state in Node process-global variables. That is unsafe for multi-tenant access and
is not durable across serverless instances. Do not share login credentials and do
not advertise this deployment as multi-user. Enforce ownership-bound persistent
sessions before offering public accounts.

Sandbox execution is isolated by Vercel microVMs, but sandbox URLs can be
independently accessible. Do not place secrets in generated source or run
untrusted commands with privileged credentials.

## Planned milestones

- P0: OIDC-backed Gateway routing in every route; project-scoped usage limits;
  durable per-session state; strict URL validation against SSRF; auth tests.
- P1: before/after screenshots with matching viewport, screenshot diff and
  manual approval gate; GitHub export with explicit repo permission and no
  unintended main-branch overwrite; replay history with immutable snapshots.
- Future: DESIGN.md swaps under explicit content and functionality contracts.

These planned capabilities are **not** implemented by this deployment guide.
