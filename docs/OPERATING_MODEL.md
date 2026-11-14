# OctoFrame Studio — Ownership & operating model

Status: v0.1, 2026-11-14. This is the **source of truth** for responsibilities,
handoffs, execution gates, and outstanding owner actions.
Repository: `r-pedro17/open-lovable`, default branch: `main`.
Deployment: Vercel project `octoframe-studio`.
Public repo: **never commit credentials, customer data, tokens, exports or private notes**.

## Roles

| Role | Responsible for | Requires owner approval for |
| --- | --- | --- |
| Product owner | Business decisions, accounts, billing approvals, invited-user acceptance, final launch sign-off | N/A |
| ChatGPT (connected tools) | Architecture, coordination, GitHub/Vercel changes within granted permissions, code reviews, issue triage and verification | Commercial spend, expanding user access, changing production exposure, irreversible changes |
| Local coding agent | Dependency installation, broad refactors, automated builds, browser tests, scans, evidence capture and failure remediation | Production credentials, permissions, destructive migrations, deployment to production |
| Colleague (not yet invited) | Product review, QA, issue reporting, scoped development once an access role is approved | Production deployments, secrets, billing, organization administration |

Keep separate service identities and least-privilege permissions. Do not assume
GitHub, Vercel and Convex access are shared. A Vercel Authentication team login
is **not** an OctoFrame customer account. Future customer auth is Convex Auth.

## Consolidated work packages

### A. Foundation — original tasks 01, 02, 03, 10
- [ ] Owner: authorize Convex project; establish separate dev/prod deployments
- [ ] Engineering: Convex Auth v2 with invite-only access, branded sign-in and studio UI
- [ ] Engineering: persistent, authenticated per-project sessions and sandbox mapping
- [ ] QA: prove cross-user isolation of files, previews, versions, costs and exports
- Release gate: no customer access before authorization and isolation tests pass

### B. Working engine — original tasks 04, 05, 06, 07
- [ ] Owner: create Firecrawl key and store it as encrypted Vercel environment variable
- [ ] Engineering: complete keyless Vercel AI Gateway/OIDC integration across routes
- [ ] Owner: inspect Gateway credits and authorize spending limit; disable auto top-up
- [ ] Engineering: sandbox quotas, timeouts, lifecycle cleanup and URL safety checks
- [ ] QA: capture → generate → preview → refine → stop sandbox, including failure paths
- Release gate: bounded spend, error handling and a passing real generation cycle

### C. Customer delivery — original task 08
- [ ] Engineering: matched before/after screenshots and responsive/functional checks
- [ ] Engineering: durable versions and replayable history
- [ ] Engineering: scoped GitHub export; explicit approval before pushing user code
- Release gate: demonstrate improvement without inventing or losing customer content

### D. Public repository security — original task 09
- [x] CI build and repository-history secret-scan workflow added (not proof of passing)
- [ ] QA: confirm CI results and run dependency/license/security reviews
- [ ] Engineering: branch protection, SSRF and prompt-injection defenses, scoped API permissions
- [ ] QA: verify backup/restore and rollback paths, audit deployment defaults
- Release gate: no exposed credentials, no public execution paths, proven least privilege

## Work allocation and handoff

1. **Owner:** create/authorize accounts, provide service keys only through service
   dashboards, approve billing limits, approve colleague role, accept final release.
2. **ChatGPT:** work from this file and GitHub issues, make scoped changes using
   connected apps, note actual verification and blockers. Never state a test passed
   without evidence.
3. **Local agent:** work on a branch, implement/test across repo, attach reproducible
   logs/screenshots and security findings to a PR. No unreviewed production writes.
4. **Owner + colleague:** review UX and accept/reject based on the product rubric.
5. **Merge:** PR checks and review first. Update this document when ownership changes.

## Colleague invitation (pending)

- [ ] Owner supplies colleague's email or GitHub username and desired scope.
- [ ] Grant **minimum necessary** GitHub permission for code review/changes.
- [ ] Grant Vercel *deployment viewer* access where supported, or a time-limited
      protected-deployment share link; do not grant billing/owner access.
- [ ] When implemented, invite a Convex Auth test account; verify no cross-user data.
- [ ] Do not publish colleague contact details in this public document.

## Rules for this public repository

Public: application source, schema, authorization logic, design system,
non-secret documentation and test fixtures.
Private: personal information, real customer URLs/data if confidential, API
keys, signing material, raw LLM traces, deployment secrets, exports and billing
information. Set secrets in managed Vercel/Convex/Firecrawl environments only.

The protected Vercel deployment remains single-operator until full customer
authentication and sandbox isolation are verified.
