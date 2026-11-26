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
          <strong>Last updated:</strong> 26 November 2026
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
          authentication. Optional Google Analytics on the public website measures visits, approximate geographic region, device/browser and traffic sources after affirmative permission. It uses analytics cookies and sends measurement data to Google, which may process it outside your country. We do not enable advertising personalisation or Google signals. Declining does not restrict access. You can change your choice in Privacy preferences at the bottom of the public website; your browser choice is retained for up to 180 days. Withdrawal stops future measurement and does not erase information already collected. Application analytics are paused; optional reading analytics are separate and remain disabled. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google’s Privacy Policy</a>.
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


        {/* NEXTSCENES_LEGAL_NOTICE_START */}
        <div className="gincoLegalNotice" aria-label="Legal business information">
          <p>Legal notice: NextScenes is owned and operated by <strong>GINCO GROUP SARL</strong>. Registered office: Quartier HAMDALLAYE ACI 2000, Immeuble PACIFIC, Bamako, Mali.</p>
        </div>
        {/* NEXTSCENES_LEGAL_NOTICE_END */}

</main>
  );
}
