/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSending(true);
    // Simulate send — replace with Formspree / EmailJS in production
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Message sent! We'll reply within 48 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setSending(false);
  };

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }

        .contact-page-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: start;
          margin-bottom: 5rem;
        }

        .contact-name-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .contact-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          color: var(--text-primary);
          font-size: 16px; /* Prevents iOS zoom */
          outline: none;
          transition: border-color 0.15s;
          box-sizing: border-box;
          font-family: var(--font-sans);
          -webkit-appearance: none;
          appearance: none;
        }

        .contact-input:focus {
          border-color: var(--accent);
        }

        .contact-submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 0.875rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.15s, opacity 0.15s;
          font-family: var(--font-sans);
          min-height: 52px;
        }

        .contact-submit-btn:hover:not(:disabled) {
          background: var(--accent-hover);
        }

        .contact-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .contact-info-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.25rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-default);
          border-radius: 12px;
        }

        .contact-info-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .contact-response-table {
          padding: 1.25rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-left: 3px solid var(--accent);
          border-radius: 12px;
        }

        @media (max-width: 700px) {
          .contact-page-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
            margin-bottom: 3rem;
          }

          .contact-name-row {
            grid-template-columns: 1fr;
            gap: 0.875rem;
          }

          .contact-info-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.875rem;
          }

          .contact-response-table,
          .contact-faq-tip {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 480px) {
          .contact-info-col {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Hero */}
      <section className="hero container" aria-label="Contact Us">
        <h1
          className="hero__title"
          style={{
            fontSize: "clamp(1.75rem, 6vw, 2.75rem)",
            lineHeight: 1.1,
            marginBottom: "0.75rem",
            letterSpacing: "-0.03em",
          }}
        >
          Contact <span style={{ color: "var(--accent)" }}>Us</span>
        </h1>
        <p
          className="hero__subtitle"
          style={{ fontSize: "clamp(0.875rem, 3vw, 0.9375rem)", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "560px", marginBottom: 0 }}
        >
          Questions, feedback, bug reports, or partnership inquiries — we read every message and reply within 48 business hours.
        </p>
      </section>

      {/* Main grid */}
      <section className="container contact-page-grid">

        {/* ── Left: Contact Form ── */}
        <div className="card" style={{ padding: "clamp(1.25rem, 4vw, 2rem)" }}>
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--text-primary)",
            }}
          >
            <span>✉️</span> Send a Message
          </h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Name + Email */}
            <div className="contact-name-row">
              <FormField label="Name *" id="contact-name">
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="contact-input"
                />
              </FormField>
              <FormField label="Email *" id="contact-email">
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="contact-input"
                />
              </FormField>
            </div>

            <FormField label="Subject" id="contact-subject">
              <select
                id="contact-subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="contact-input"
                style={{ cursor: "pointer" }}
              >
                <option value="">Select a topic…</option>
                <option value="bug">🐛 Bug Report</option>
                <option value="feature">💡 Feature Request</option>
                <option value="pricing">💰 Pricing / Data Issue</option>
                <option value="partnership">🤝 Partnership / Collaboration</option>
                <option value="privacy">🔐 Privacy / Data Request</option>
                <option value="other">💬 Other</option>
              </select>
            </FormField>

            <FormField label="Message *" id="contact-message">
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Describe your question or issue in detail…"
                value={form.message}
                onChange={handleChange}
                required
                className="contact-input"
                style={{ resize: "vertical", minHeight: "130px", fontFamily: "var(--font-sans)" }}
              />
            </FormField>

            <button type="submit" disabled={sending} className="contact-submit-btn">
              {sending ? (
                <>
                  <span
                    style={{
                      width: "16px", height: "16px",
                      border: "2px solid rgba(255,255,255,0.4)",
                      borderTopColor: "white",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  Sending…
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* ── Right: Info ── */}
        <div className="contact-info-col" style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>

          {/* Email */}
          <div className="contact-info-card">
            <div className="contact-info-icon" style={{ background: "rgba(255,72,0,0.1)" }}>📧</div>
            <div>
              <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.2rem", fontSize: "0.9375rem" }}>Email Us</div>
              <a href="mailto:hello@tokencalculator.app" style={{ color: "var(--accent)", fontSize: "0.875rem", wordBreak: "break-all" }}>
                hello@tokencalculator.app
              </a>
              <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "0.25rem", lineHeight: 1.4 }}>
                Replies within 48 business hours
              </p>
            </div>
          </div>

          {/* Privacy */}
          <div className="contact-info-card">
            <div className="contact-info-icon" style={{ background: "rgba(0,196,125,0.1)" }}>🔐</div>
            <div>
              <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.2rem", fontSize: "0.9375rem" }}>Privacy Requests</div>
              <a href="mailto:privacy@tokencalculator.app" style={{ color: "var(--accent)", fontSize: "0.875rem", wordBreak: "break-all" }}>
                privacy@tokencalculator.app
              </a>
              <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "0.25rem", lineHeight: 1.4 }}>
                GDPR / CCPA data requests
              </p>
            </div>
          </div>

          {/* GitHub */}
          <div className="contact-info-card">
            <div className="contact-info-icon" style={{ background: "rgba(108,99,255,0.1)" }}>🐛</div>
            <div>
              <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.2rem", fontSize: "0.9375rem" }}>Bug Reports</div>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", fontSize: "0.875rem" }}>
                Open an Issue on GitHub ↗
              </a>
              <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "0.25rem", lineHeight: 1.4 }}>
                Technical bugs &amp; feature requests
              </p>
            </div>
          </div>

          {/* Response times */}
          <div className="contact-response-table">
            <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.625rem", fontSize: "0.875rem" }}>
              ⏱ Typical Response Times
            </div>
            {[
              { type: "Bug reports", time: "24 hrs" },
              { type: "Feature requests", time: "48 hrs" },
              { type: "Privacy requests", time: "72 hrs" },
              { type: "Partnerships", time: "5 days" },
            ].map(({ type, time }) => (
              <div
                key={type}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.8125rem",
                  padding: "5px 0",
                  borderBottom: "1px solid var(--border-subtle)",
                  color: "var(--text-secondary)",
                }}
              >
                <span>{type}</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "var(--green)", fontWeight: 600 }}>{time}</span>
              </div>
            ))}
          </div>

          {/* FAQ tip */}
          <div
            className="contact-faq-tip"
            style={{
              padding: "1rem 1.25rem",
              background: "rgba(255,72,0,0.05)",
              border: "1px solid rgba(255,72,0,0.15)",
              borderRadius: "12px",
            }}
          >
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
              💡 <strong style={{ color: "var(--text-primary)" }}>Quick answers:</strong>{" "}
              Check our <a href="/#faq" style={{ color: "var(--accent)" }}>FAQ</a> or{" "}
              <a href="/blog" style={{ color: "var(--accent)" }}>Blog</a> first.
            </p>
          </div>

        </div>
      </section>

      <ToastContainer theme="dark" position="bottom-center" />
    </>
  );
}

function FormField({ label, id, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <label
        htmlFor={id}
        style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
