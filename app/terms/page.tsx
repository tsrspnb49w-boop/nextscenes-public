// app/terms/page.tsx
// Build: 2026-02-beta-terms-v1

export const metadata = {
  title: "Terms of Service | NextScenes",
  description: "Beta Terms of Service for the NextScenes platform.",
};

export default function TermsPage() {
  return (
    <main className="ns-page">
      <h1 className="ns-h1">Terms of Service</h1>

      <p className="ns-subtitle">NextScenes Beta Program</p>

      <section className="ns-section ns-paper" style={{ marginTop: 18 }}>
        <p className="ns-p">
          <strong>Last updated:</strong> February 2026
        </p>

        <h2 className="ns-h2">1. Introduction</h2>
        <p className="ns-p">
          NextScenes is a collaborative storytelling platform currently operating
          in a limited beta phase. By accessing or using the platform, you agree
          to these Terms of Service. This beta version is experimental. Features
          may change, improve, or be removed without notice.
        </p>

        <h2 className="ns-h2">2. Beta status</h2>
        <p className="ns-p">
          NextScenes is not a public release. Access may be restricted, revoked,
          or modified. We may adjust platform structure, writing modes, or access
          permissions during the beta period.
        </p>

        <h2 className="ns-h2">3. User responsibilities</h2>
        <p className="ns-p">
          You agree to provide accurate account information, respect community
          standards, and not attempt to bypass role-based permissions. You are
          responsible for the content you create or submit.
        </p>

        <h2 className="ns-h2">4. Intellectual property</h2>
        <p className="ns-p">
          Writers retain ownership of the stories and scenes they create. By
          posting content on NextScenes, you grant the platform a limited license
          to display your content within the platform, preserve accepted canon
          decisions, and archive proposal and governance records. NextScenes does
          not claim ownership of your creative work.
        </p>

        <h2 className="ns-h2">5. Platform governance</h2>
        <p className="ns-p">
          NextScenes uses structured writing modes (Solo, Collaborative, Group
          Open, Group Closed). Each mode has defined authority and decision
          rules. Accepted canon decisions are recorded and preserved.
        </p>

        <h2 className="ns-h2">6. Prohibited conduct</h2>
        <p className="ns-p">
          You may not harass other users, impersonate others, attempt unauthorized
          access, exploit vulnerabilities, or interfere with platform stability.
          Beta access may be suspended for violations.
        </p>

        <h2 className="ns-h2">7. Availability</h2>
        <p className="ns-p">
          The beta platform is provided “as is.” We do not guarantee continuous
          availability, permanent storage, or error-free performance.
        </p>

        <h2 className="ns-h2">8. Termination</h2>
        <p className="ns-p">
          We may suspend or terminate access if these Terms are violated, platform
          security is threatened, or beta access is restructured.
        </p>

        <h2 className="ns-h2">9. Changes</h2>
        <p className="ns-p">
          These Terms may evolve during beta. Continued use of the platform
          indicates acceptance of updates.
        </p>

        <h2 className="ns-h2">10. Contact</h2>
        <p className="ns-p">
          For questions regarding these Terms, contact the beta support email
          provided in your invitation.
        </p>
      </section>
    </main>
  );
}
