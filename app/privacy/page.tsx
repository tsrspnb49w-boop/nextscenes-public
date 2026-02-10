// app/privacy/page.tsx
// Build: 2026-02-beta-privacy-v1

export const metadata = {
  title: "Privacy Policy | NextScenes",
  description: "Beta Privacy Policy for the NextScenes platform.",
};

export default function PrivacyPage() {
  return (
    <main className="ns-page">
      <h1 className="ns-h1">Privacy Policy</h1>

      <p className="ns-subtitle">NextScenes Beta Program</p>

      <section className="ns-section ns-paper" style={{ marginTop: 18 }}>
        <p className="ns-p">
          <strong>Last updated:</strong> February 2026
        </p>

        <h2 className="ns-h2">1. Overview</h2>
        <p className="ns-p">
          NextScenes respects user privacy. During beta, we collect only limited
          information necessary to operate the platform.
        </p>

        <h2 className="ns-h2">2. Information we collect</h2>
        <p className="ns-p">
          We may collect your email address, username, account role, content you
          submit (stories, scenes, feedback), and technical logs related to
          platform stability. We do not sell user data.
        </p>

        <h2 className="ns-h2">3. How we use information</h2>
        <p className="ns-p">
          We use collected data to operate the platform, manage writing modes and
          governance, respond to feedback, improve stability, and monitor security.
        </p>

        <h2 className="ns-h2">4. Content visibility</h2>
        <p className="ns-p">
          Content may be visible to story participants and readers depending on
          story settings. Administrators may review content for moderation and
          safety purposes. Beta testers should not treat the platform as private
          storage.
        </p>

        <h2 className="ns-h2">5. Data storage</h2>
        <p className="ns-p">
          Data is stored using standard hosting services. As a beta system, data
          loss is unlikely but possible. Keep personal backups of important work.
        </p>

        <h2 className="ns-h2">6. Cookies and sessions</h2>
        <p className="ns-p">
          NextScenes uses session cookies to maintain login status and secure
          authentication. We do not use advertising trackers.
        </p>

        <h2 className="ns-h2">7. Data deletion</h2>
        <p className="ns-p">
          You may request account deletion via the beta support email provided in
          your invitation. Account data will be removed. Published collaborative
          canon may remain if required for story integrity.
        </p>

        <h2 className="ns-h2">8. Security</h2>
        <p className="ns-p">
          We take reasonable steps to protect user information, but no system can
          guarantee absolute security.
        </p>

        <h2 className="ns-h2">9. Changes</h2>
        <p className="ns-p">
          This policy may be updated during beta. Updated versions will include a
          revised “Last updated” date.
        </p>

        <h2 className="ns-h2">10. Contact</h2>
        <p className="ns-p">
          For privacy-related questions, contact the beta support email provided
          in your invitation.
        </p>
      </section>
    </main>
  );
}
