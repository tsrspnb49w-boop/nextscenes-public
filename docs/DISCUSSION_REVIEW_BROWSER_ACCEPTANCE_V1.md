# NextScenes · Discussion Integration V1 · Isolated Browser Acceptance

**Status:** review preparation only. Never deploy this candidate to the accepted Novel/Story staging service or public/production services.

## Pinned review branches
- Application/backend: `review/discussion-public-feedback-scroll-v1-20261030` in `nextscenes-2025`.
- Public site: `review/public-feedback-participation-scroll-v1-20261030` in `nextscenes-public`.
- Keep both pull requests as **Draft** until approved.

## Recommended isolated review service identities
Services are **not provisioned** by this guide. Creating them can incur charges.

| Role | Proposed Render name | Expected URL |
|---|---|---|
| Backend | `nextscenes-review-api-discussion` | `https://nextscenes-review-api-discussion.onrender.com` |
| Public website | `nextscenes-review-public-discussion` | `https://nextscenes-review-public-discussion.onrender.com` |
| Login/application | `nextscenes-review-app-discussion` | `https://nextscenes-review-app-discussion.onrender.com` |

Use `autoDeploy=no` for all three. Pin the exact passing review commits rather than merging them into currently deployed branches.

**Database and identity isolation:** Use a distinct development MongoDB database and synthetic users/stories. Never connect review services to production MongoDB, production session stores or production SendGrid/SMTP keys. Provision fresh review-only session secrets and avoid real member credentials. No production write access.

## Backend environment gate
- `NODE_ENV=production` (HTTPS/secure cookies).
- `RENDER_SERVICE_NAME=nextscenes-review-api-discussion` (normally populated by Render).
- `NEXTSCENES_REVIEW_COOKIE_MODE=true` only on this isolated backend.
- `FRONTEND_PUBLIC_URL=https://nextscenes-review-public-discussion.onrender.com`.
- `FRONTEND_APP_URL=https://nextscenes-review-app-discussion.onrender.com`.
- `CORS_ORIGIN` should contain the exact two review origins, with **no production origin**.
- `CORS_ALLOW_NEXTSCENES_SUBDOMAINS=false`.
- `MONGO_DB_NAME` and `MONGODB_URI`: isolated review database.
- `SESSION_SECRET`: strong separate review-only secret (never store in Git).
- No external email integrations unless independently sandboxed.

Without the review cookie flag, the production-mode backend keeps the historical `.nextscenes.org` cookie Domain, unsuitable for an onrender.com review API. The flag makes **both session and CSRF cookies host-only**, `Secure`, `HttpOnly` and `SameSite=None`. An invalid service name causes startup failure.

## Public website and application
- Public build: `NEXT_PUBLIC_NEXTSCENES_API_BASE=https://nextscenes-review-api-discussion.onrender.com`; configure the public app link to the review app.
- Review application build: `REACT_APP_API_BASE=https://nextscenes-review-api-discussion.onrender.com`.
- The public site enforces this exact read/write origin pairing. Wrong environment combinations fail closed.

## Read-only preflight before writing
Check HTTPS connectivity, `GET /api/csrf` cookie attributes, exact `Access-Control-Allow-Origin`, `Access-Control-Allow-Credentials: true`, an unauthenticated 401 from `GET /api/public-community/v1/member`, and `OPTIONS /api/public-community/v1/feedback` for `POST`, `Content-Type` and `X-CSRF-Token`.

Do **not** send test writes to production. The read-only public-site preflight accepts the explicit `--review` profile for these isolated review hostnames (`node scripts/publicFeedbackStagingPreflight.mjs --review`). The manual GitHub workflow uses this profile and never performs POST. Run it only **after** the isolated services are configured. Mocked preflight tests do not prove browser session behavior.

## Browser acceptance with synthetic accounts
1. Anonymous visitor: can read eligible public threads, but cannot post. Login prompt appears. A direct anonymous POST receives 401 or 403 (CSRF).
2. Verified synthetic member: logs into the **review application**, returns to the review public site, sees a comment composer, submits exactly one labelled test comment, then refreshes. The comment persists.
3. Another verified synthetic member: reads that public thread, posts a reply, refreshes both the public site and Writer Studio; the same discussion remains visible.
4. Negative cases: private, restricted, closed-group and archived stories are absent from public selection; cross-story, Beta, archived or nested reply targets are rejected.
5. Large-volume test: three-thread preview, repeated ten-thread cursor pages, no duplicates/missing same-timestamp comments, readable scrollbar, mobile and keyboard scrolling, EN/FR labels, reduced-motion preference.
6. Review sign-off: owner-only Canon/Proposal permissions still pass; no data or sessions cross into production.

### Browser cookie caveat
`*.onrender.com` services may be treated as cross-site. Browser third-party-cookie restrictions can block login sessions despite correct server `SameSite=None; Secure` attributes. **Do not weaken CSRF, CORS, visibility or session checks to make it pass.** If cookies fail, stop and investigate a dedicated same-site review-domain solution with isolated secrets and no production cookie sharing.

**Release blockers:** live review environment deployment; real browser sign-in and CSRF behavior; confirmed multi-user persistence; negative authorization acceptance; explicit owner approval. Keep Draft PRs unmerged until all pass.
