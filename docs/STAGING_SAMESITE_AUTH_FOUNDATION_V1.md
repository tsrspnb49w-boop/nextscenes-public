# NextScenes staging login foundation · Same-site V1

**Review only. Not deployed. No changes to production domains, services or databases.**

## Why this is needed
The public site and the app currently load from independent `onrender.com` origins and send cross-site credentialed requests to another `onrender.com` backend. Third-party cookie blocking causes `GET /api/public-community/v1/member` to return 401 even after app sign-in. No UX changes or weaker authorization can repair that.

## Reuse the earlier NextScenes staging hostnames
| Existing service | Preferred same-site hostname | Render target |
| --- | --- | --- |
| staging application | `staging.nextscenes.org` | `nextscenes-staging-frontend.onrender.com` |
| staging backend | `api-staging.nextscenes.org` | `nextscenes-staging-backend.onrender.com` |
| staging public site | `public-staging.nextscenes.org` | `nextscenes-public-staging.onrender.com` |

**Existing record audit FIRST:** `staging.nextscenes.org` and `api-staging.nextscenes.org` were used previously. Their *current* DNS destination and Render service assignment have not been verified. Do not overwrite existing records without establishing where they point. Production `nextscenes.org`, `www`, `app` and `api` records must not change.

In Render, add each hostname under the corresponding existing staging service **Settings → Custom Domains**. Complete and verify Render TLS. In Squarespace Domains → DNS Settings, add or verify CNAME host labels `staging`, `api-staging`, `public-staging` pointing to their respective exact `*.onrender.com` service targets. Do not switch app links until all three HTTPS hostnames work and are confirmed assigned to the expected services.

## Code safeguards on isolated branches
- Backend: `candidate/staging-samesite-auth-backend-v1-20261030`. The existing staging database and Render backend service ID must match. `NEXTSCENES_STAGING_SAMESITE_AUTH=true` is rejected elsewhere. The session/CSRF cookies remain **host-only** to the staging API, `Secure`, `HttpOnly`, with original expiration and CSRF protection.
- App: `candidate/staging-samesite-auth-app-v1-20261030`. Only `staging.nextscenes.org` uses `api-staging.nextscenes.org`; the existing `onrender.com` app and production API selection remain unchanged.
- Public: `candidate/staging-samesite-auth-public-v1-20261030`. Only `public-staging.nextscenes.org` sends browser member checks/writes to `api-staging.nextscenes.org`. The read proxy opts into that origin by exact Render staging service identity and setting; production remains pinned to `api.nextscenes.org`.

## Activation after domain/TLS verification
1. Backend staging environment:
   - `NEXTSCENES_STAGING_SAMESITE_AUTH=true`
   - `SESSION_COOKIE_NAME=nextscenes.staging.sid`
   - `CSRF_COOKIE_NAME=ns.staging.csrf`
   - Preserve staging-only `MONGO_DB_NAME`, `MONGODB_URI`, `SESSION_SECRET`, and all production values unchanged
2. Deploy the backend candidate and verify health and same-site CORS for *only* the two staging UI origins. The existing `onrender.com` origins remain allowed for staging continuity; cookie sharing is expected to work only at the custom hosts.
3. Deploy the application candidate to the **existing** staging frontend service; open `https://staging.nextscenes.org` and sign in with a staging writer account.
4. Public staging environment: `NEXTSCENES_STAGING_SAMESITE_AUTH=true`. Deploy the public candidate to the **existing** public staging service and open `https://public-staging.nextscenes.org`.
5. Confirm signed-in writer probe returns 200 with `canWrite:true`, reply text and emoji persist on refresh; a writer cannot reply to their own post but can create distinct root posts. Anonymous/reader roles remain read-only; private, archived and Group content remain excluded.
6. Existing production UI and API keep their unchanged session cookie configuration. Never copy production session secrets or cookie names to staging.

## Stop/rollback rules
If DNS, TLS or session verification fails, do not claim the comments are fixed. Leave existing production untouched. Disable `NEXTSCENES_STAGING_SAMESITE_AUTH` on the staging services, restore prior staging commit pins if needed and revert to the earlier `onrender.com` staging links. No test writer credentials or session tokens belong in GitHub or CI logs.

### Verification boundaries
The current Render connector can read staging service and deployment status, update environment variables and trigger deploys, **but does not expose custom-domain creation or DNS-record management**. The Render dashboard and Squarespace DNS steps require the authorised domain owner; neither can be silently completed through a code commit.
