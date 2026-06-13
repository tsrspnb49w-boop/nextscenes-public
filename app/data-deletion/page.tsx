// app/data-deletion/page.tsx
// Build: 2026-06-facebook-data-deletion-v1

export const metadata = {
  title: "User Data Deletion | NextScenes",
  description:
    "Instructions for requesting deletion of NextScenes account data connected to Facebook Login.",
};

export default function DataDeletionPage() {
  return (
    <main className="ns-page">
      <h1 className="ns-h1">User Data Deletion</h1>

      <p className="ns-subtitle">NextScenes account and Facebook Login data</p>

      <section className="ns-section ns-paper" style={{ marginTop: 18 }}>
        <p className="ns-p">
          <strong>Last updated:</strong> June 2026
        </p>

        <h2 className="ns-h2">1. Overview</h2>
        <p className="ns-p">
          NextScenes allows users to sign in using supported login methods,
          including Facebook Login where available. If you signed in to
          NextScenes using Facebook and would like your related account data
          deleted, you may request deletion using the instructions below.
        </p>

        <h2 className="ns-h2">2. How to request deletion</h2>
        <p className="ns-p">
          To request deletion of your NextScenes account data connected to
          Facebook Login, contact us at support@nextscenes.org.
        </p>
        <p className="ns-p">
          Please include the email address connected to your NextScenes account
          so we can identify the correct record. Do not send passwords or other
          sensitive information by email.
        </p>

        <h2 className="ns-h2">3. What may be deleted</h2>
        <p className="ns-p">
          After receiving a valid deletion request, we will delete or anonymize
          account information associated with your NextScenes account, including
          Facebook Login identifiers where applicable.
        </p>

        <h2 className="ns-h2">4. Content and platform records</h2>
        <p className="ns-p">
          Some published, collaborative, moderation, security, or governance
          records may be retained where necessary to protect platform integrity,
          comply with legal obligations, prevent misuse, or preserve accepted
          story decisions. Where possible, personal account information will be
          removed or anonymized.
        </p>

        <h2 className="ns-h2">5. Facebook permissions</h2>
        <p className="ns-p">
          NextScenes uses Facebook Login only to help identify and sign users
          into their accounts. We do not request unnecessary Facebook
          permissions, and we do not sell user data.
        </p>

        <h2 className="ns-h2">6. Processing time</h2>
        <p className="ns-p">
          We will review valid deletion requests and process them within a
          reasonable period. We may contact you if additional information is
          needed to confirm the correct account.
        </p>

        <h2 className="ns-h2">7. Contact</h2>
        <p className="ns-p">
          For data deletion requests or privacy questions, contact
          support@nextscenes.org.
        </p>
      </section>
    </main>
  );
}
