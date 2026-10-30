"use strict";
// Fail closed if a discussion review build would send sign-in or story links to production.
const REQUIRED_APP={
  "https://nextscenes-review-api-discussion.onrender.com":
    "https://nextscenes-review-app-discussion.onrender.com",
  "https://nextscenes-staging-backend.onrender.com":
    "https://nextscenes-staging-frontend.onrender.com",
};
function resolvePublicAppUrl(configuredApp,configuredApi){
  const app=String(configuredApp||"").trim().replace(/\/+$/,"");
  const api=String(configuredApi||"").trim().replace(/\/+$/,"");
  const required=REQUIRED_APP[api];
  if(required&&app!==required) {
    throw new Error("Public-site review/staging app origin does not match the selected API environment");
  }
  return app||"https://app.nextscenes.org";
}
module.exports={resolvePublicAppUrl};
