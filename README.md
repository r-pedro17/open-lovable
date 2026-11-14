# OctoFrame Studio — website upgrade workspace

A minimal interface for capturing an existing website, improving its design and
structure, and reviewing the result. Built as a customized fork of
[Firecrawl Open Lovable](https://github.com/firecrawl/open-lovable) (MIT).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fr-pedro17%2Fopen-lovable)

## Ownership and execution

See [Operating model, work packages and colleague access](docs/OPERATING_MODEL.md). This is the source of truth for responsibility split and release gates.

## Current state
- **Public landing page** uses the OctoFrame V5.2 visual direction and shows
  **illustrative**, not generated, before/after examples.
- **Private generation engine** lives at `/generation`. Its API routes are
  unavailable until both `STUDIO_USERNAME` and `STUDIO_PASSWORD` are set.
- Website scraping requires `FIRECRAWL_API_KEY`.
- Vercel Sandbox is supported, but project creation does not automatically
  provision a running sandbox. Sandbox usage begins when the app calls the API.
- Vercel AI Gateway can use project OIDC on migrated AI SDK routes. Some
  legacy provider routes still need conversion. Model access, usage limits,
  and production operation are not yet fully verified.
- Multi-user access is **not supported**: upstream process-global state is
  not session-isolated. Avoid sharing credentials or exposing generated
  sandbox preview URLs.

## Deploy
1. Click **Deploy with Vercel** or import this repository as a Next.js project.
2. Publish the public homepage with **no application keys**.
3. When ready, set `STUDIO_USERNAME`, `STUDIO_PASSWORD`,
   `FIRECRAWL_API_KEY`, and `SANDBOX_PROVIDER=vercel` in Vercel project
   environment variables and redeploy.
4. Enable Vercel AI Gateway and configure cost controls before use.
5. Verify authorization, screenshot capture, generation, sandbox lifecycle,
   and export end to end.

See [deployment and security notes](docs/DEPLOY.md).

## Development
```sh
npm ci
npm run dev
```

Copy `.env.example` to `.env.local` for local testing. Do not commit real keys.

## License
MIT. Original implementation © Firecrawl contributors, maintained here as
an independent customized fork. Not affiliated with Relume.
