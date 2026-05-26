/* eslint-disable react/no-unescaped-entities */
export const metadata = {
  title: "Privacy Policy — Token Calculator",
  description:
    "Privacy Policy for tokencalculator.app. Learn how we handle your data, cookies, and third-party services including Google AdSense.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "May 27, 2026";
const SITE = "tokencalculator.app";
const CONTACT_EMAIL = "privacy@tokencalculator.app";

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero container" aria-label="Privacy Policy">
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,72,0,0.08)", border: "1px solid rgba(255,72,0,0.2)", borderRadius: "999px", padding: "4px 14px", fontSize: "0.75rem", fontWeight: 600, color: "var(--accent)", marginBottom: "1rem", fontFamily: "var(--font-mono)" }}>
          Last updated: {LAST_UPDATED}
        </div>
        <h1 className="hero__title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.1, marginBottom: "0.75rem", letterSpacing: "-0.03em" }}>
          Privacy <span style={{ color: "var(--accent)" }}>Policy</span>
        </h1>
        <p className="hero__subtitle" style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "640px" }}>
          This policy explains how {SITE} collects, uses, and protects your information when you use our free AI token calculator.
        </p>
      </section>

      {/* Content */}
      <section className="container" style={{ marginBottom: "5rem", maxWidth: "800px" }}>
        <article style={{ lineHeight: 1.8, color: "var(--text-secondary)", fontSize: "0.9375rem" }}>

          {/* 1 */}
          <PolicySection icon="🏢" title="1. Who We Are">
            <p>
              <strong style={{ color: "var(--text-primary)" }}>{SITE}</strong> ("we", "us", "our") operates a free,
              browser-based AI token calculator. Our website is available at{" "}
              <a href="https://tokencalculator.app" style={{ color: "var(--accent)" }}>https://tokencalculator.app</a>.
            </p>
            <p style={{ marginTop: "0.75rem" }}>
              For privacy-related questions, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>{CONTACT_EMAIL}</a>.
            </p>
          </PolicySection>

          {/* 2 */}
          <PolicySection icon="📊" title="2. Information We Collect">
            <h3 style={h3Style}>2.1 Information You Provide</h3>
            <p>
              <strong style={{ color: "var(--text-primary)" }}>We do not collect any text you type into the calculator.</strong>{" "}
              All tokenization happens entirely in your browser via WebAssembly. Your prompts and text are never sent to our servers.
            </p>
            <p style={{ marginTop: "0.75rem" }}>
              If you contact us via email, we receive the information you voluntarily provide in that communication.
            </p>

            <h3 style={{ ...h3Style, marginTop: "1.25rem" }}>2.2 Automatically Collected Information</h3>
            <p>When you visit our site, we and our third-party partners may automatically collect:</p>
            <ul style={ulStyle}>
              <li><strong>Log data:</strong> IP address, browser type, referring URL, pages visited, time and date of visit</li>
              <li><strong>Device information:</strong> operating system, screen resolution, browser version</li>
              <li><strong>Usage data:</strong> pages viewed, links clicked, time spent on pages</li>
              <li><strong>Cookies and similar tracking technologies</strong> (see Section 4)</li>
            </ul>
          </PolicySection>

          {/* 3 */}
          <PolicySection icon="🎯" title="3. How We Use Your Information">
            <p>We use the information collected to:</p>
            <ul style={ulStyle}>
              <li>Operate, maintain, and improve the website and calculator tool</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Display relevant advertisements through Google AdSense</li>
              <li>Comply with legal obligations</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Respond to your inquiries when you contact us</li>
            </ul>
          </PolicySection>

          {/* 4 */}
          <PolicySection icon="🍪" title="4. Cookies and Tracking Technologies">
            <p>
              We use cookies and similar technologies to enhance your browsing experience and serve personalized advertising.
            </p>

            <h3 style={h3Style}>Types of Cookies We Use</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.75rem" }}>
              {[
                { name: "Essential Cookies", desc: "Required for the website to function. These cannot be disabled.", color: "var(--green)" },
                { name: "Analytics Cookies", desc: "Help us understand how visitors interact with the site (e.g., Google Analytics).", color: "var(--blue)" },
                { name: "Advertising Cookies", desc: "Used by Google AdSense to serve relevant ads based on your browsing history.", color: "var(--amber)" },
                { name: "Preference Cookies", desc: "Remember your settings and preferences for future visits.", color: "var(--purple)" },
              ].map(({ name, desc, color }) => (
                <div key={name} style={{ display: "flex", gap: "0.75rem", padding: "0.75rem 1rem", background: "var(--bg-secondary)", borderRadius: "8px", border: "1px solid var(--border-subtle)" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0, marginTop: "6px" }} />
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.875rem", marginBottom: "2px" }}>{name}</div>
                    <div style={{ fontSize: "0.8125rem" }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: "1rem" }}>
              You can control or disable cookies through your browser settings. Note that disabling certain cookies may affect site functionality.
            </p>
          </PolicySection>

          {/* 5 */}
          <PolicySection icon="📢" title="5. Google AdSense & Advertising">
            <p>
              We use <strong style={{ color: "var(--text-primary)" }}>Google AdSense</strong> to display advertisements on our site.
              Google AdSense uses cookies to serve ads based on your prior visits to our website and other websites on the internet.
            </p>
            <p style={{ marginTop: "0.75rem" }}>
              Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or
              other sites on the Internet. You may opt out of personalized advertising by visiting{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                Google Ads Settings
              </a>.
            </p>
            <div style={{ padding: "1rem", background: "rgba(255,72,0,0.06)", border: "1px solid rgba(255,72,0,0.2)", borderRadius: "8px", marginTop: "1rem" }}>
              <p style={{ margin: 0, fontSize: "0.875rem" }}>
                <strong style={{ color: "var(--accent)" }}>Third-Party Vendor Notice:</strong> Google, as a third-party vendor,
                uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads based on users'
                visits to our site and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting
                the{" "}
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                  Google ad and content network privacy policy
                </a>.
              </p>
            </div>
          </PolicySection>

          {/* 6 */}
          <PolicySection icon="🔗" title="6. Third-Party Services">
            <p>We use the following third-party services that may collect data:</p>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.75rem", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <th style={{ textAlign: "left", padding: "8px 12px", color: "var(--text-primary)", fontWeight: 600 }}>Service</th>
                  <th style={{ textAlign: "left", padding: "8px 12px", color: "var(--text-primary)", fontWeight: 600 }}>Purpose</th>
                  <th style={{ textAlign: "left", padding: "8px 12px", color: "var(--text-primary)", fontWeight: 600 }}>Privacy Policy</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { service: "Google AdSense", purpose: "Display advertising", link: "https://policies.google.com/privacy" },
                  { service: "Google Analytics", purpose: "Usage analytics", link: "https://policies.google.com/privacy" },
                  { service: "Vercel", purpose: "Website hosting", link: "https://vercel.com/legal/privacy-policy" },
                ].map(({ service, purpose, link }) => (
                  <tr key={service} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "8px 12px", color: "var(--text-primary)", fontWeight: 500 }}>{service}</td>
                    <td style={{ padding: "8px 12px" }}>{purpose}</td>
                    <td style={{ padding: "8px 12px" }}>
                      <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", fontSize: "0.8125rem" }}>View Policy ↗</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PolicySection>

          {/* 7 */}
          <PolicySection icon="🌍" title="7. GDPR — Rights for EU/EEA Users">
            <p>If you are located in the European Union or European Economic Area, you have the following rights under the General Data Protection Regulation (GDPR):</p>
            <ul style={ulStyle}>
              <li><strong style={{ color: "var(--text-primary)" }}>Right of Access</strong> — Request a copy of the personal data we hold about you</li>
              <li><strong style={{ color: "var(--text-primary)" }}>Right to Rectification</strong> — Request correction of inaccurate data</li>
              <li><strong style={{ color: "var(--text-primary)" }}>Right to Erasure</strong> — Request deletion of your personal data</li>
              <li><strong style={{ color: "var(--text-primary)" }}>Right to Object</strong> — Object to processing of your data for certain purposes</li>
              <li><strong style={{ color: "var(--text-primary)" }}>Right to Data Portability</strong> — Request your data in a structured, machine-readable format</li>
              <li><strong style={{ color: "var(--text-primary)" }}>Right to Withdraw Consent</strong> — Withdraw consent at any time where processing is based on consent</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>
              To exercise any of these rights, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>{CONTACT_EMAIL}</a>.
            </p>
          </PolicySection>

          {/* 8 */}
          <PolicySection icon="🇺🇸" title="8. CCPA — Rights for California Residents">
            <p>If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA):</p>
            <ul style={ulStyle}>
              <li>The right to know what personal information is collected about you</li>
              <li>The right to know whether your personal information is sold or disclosed</li>
              <li>The right to opt out of the sale of personal information</li>
              <li>The right to equal service and price (non-discrimination)</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>
              <strong style={{ color: "var(--text-primary)" }}>We do not sell your personal information.</strong> To submit a request
              under CCPA, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>{CONTACT_EMAIL}</a>.
            </p>
          </PolicySection>

          {/* 9 */}
          <PolicySection icon="👶" title="9. Children's Privacy">
            <p>
              Our service is not directed to children under the age of 13. We do not knowingly collect personal information
              from children under 13. If you are a parent or guardian and believe your child has provided us with personal
              information, please contact us immediately at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>{CONTACT_EMAIL}</a>.
            </p>
          </PolicySection>

          {/* 10 */}
          <PolicySection icon="🔐" title="10. Data Security">
            <p>
              We implement appropriate technical and organizational measures to protect your information against unauthorized
              access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or method
              of electronic storage is 100% secure.
            </p>
            <p style={{ marginTop: "0.75rem" }}>
              <strong style={{ color: "var(--text-primary)" }}>Key point:</strong> Since all text processing (tokenization) happens
              entirely in your browser via WebAssembly, your text content is never transmitted to our servers.
            </p>
          </PolicySection>

          {/* 11 */}
          <PolicySection icon="🔄" title="11. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by updating
              the "Last Updated" date at the top of this page. We encourage you to review this policy periodically.
            </p>
          </PolicySection>

          {/* 12 */}
          <PolicySection icon="✉️" title="12. Contact Us">
            <p>If you have questions about this Privacy Policy, please contact us:</p>
            <div style={{ marginTop: "1rem", padding: "1.25rem", background: "var(--bg-secondary)", border: "1px solid var(--border-default)", borderRadius: "12px" }}>
              <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>tokencalculator.app</div>
              <div>Email: <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>{CONTACT_EMAIL}</a></div>
              <div style={{ marginTop: "0.25rem" }}>Website: <a href="https://tokencalculator.app" style={{ color: "var(--accent)" }}>https://tokencalculator.app</a></div>
              <div style={{ marginTop: "0.25rem", color: "var(--text-tertiary)", fontSize: "0.875rem" }}>Response time: within 48 business hours</div>
            </div>
          </PolicySection>

        </article>
      </section>
    </>
  );
}

function PolicySection({ icon, title, children }) {
  return (
    <div style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border-subtle)" }}>
      <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>{icon}</span> {title}
      </h2>
      {children}
    </div>
  );
}

const h3Style = {
  fontSize: "0.9375rem",
  fontWeight: 600,
  color: "var(--text-primary)",
  marginBottom: "0.5rem",
  marginTop: "0.75rem",
};

const ulStyle = {
  paddingLeft: "1.25rem",
  marginTop: "0.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.375rem",
};
