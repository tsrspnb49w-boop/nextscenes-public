"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import React, { useMemo, useState } from "react";

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="ns-card">
      <h3 className="ns-h3">{title}</h3>
      <div className="ns-p" style={{ marginBottom: 0 }}>
        {children}
      </div>
    </div>
  );
}

function s(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

export default function ContactPage() {
  const API_URL = useMemo(() => {
    const fromEnv = s(process.env.NEXT_PUBLIC_API_URL);
    return fromEnv || "https://api.nextscenes.org";
  }, []);

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: 6,
    fontWeight: 900,
    fontSize: 13,
    color: "#0f172a",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: "#fff",
    outline: "none",
    fontSize: 14,
    fontWeight: 700,
    color: "#0f172a",
    boxShadow: "0 1px 0 rgba(15, 23, 42, 0.02)",
  };

  const textAreaStyle: React.CSSProperties = {
    ...inputStyle,
    fontWeight: 600,
    lineHeight: 1.5,
    resize: "vertical",
  };

  function scrollToForm() {
    try {
      const el = document.getElementById("contact-form");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      // ignore
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: s(fd.get("name")),
      email: s(fd.get("email")),
      subject: s(fd.get("subject")),
      message: s(fd.get("message")),
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      honey: s(fd.get("honey")),
    };

    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      setErr("Please fill in all fields.");
      return;
    }

    if (payload.message.length > 5000) {
      setErr("Your message is too long. Please shorten it.");
      return;
    }

    if (payload.honey) {
      setSent(true);
      form.reset();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          subject: payload.subject,
          message: payload.message,
          pageUrl: payload.pageUrl,
        }),
      });

      const data = await res.json().catch(() => ({} as any));

      if (!res.ok || !data?.ok) {
        setErr(data?.error || "We could not send your message. Please try again.");
        setLoading(false);
        return;
      }

      setSent(true);
      form.reset();
      setLoading(false);

      // bring them back to the form area (success message)
      scrollToForm();
    } catch (e2) {
      setErr("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="ns-page">
      <section style={{ padding: "10px 0 8px" }}>
        <h1 className="ns-h1">Contact</h1>
        <p className="ns-subtitle" style={{ maxWidth: 980 }}>
          NextScenes is a serious cultural and educational platform. We welcome thoughtful messages from
          schools, institutions, partners, communities, and individuals who want to understand or work with us.
        </p>

        <div className="ns-hero-cta">
          <button type="button" className="ns-btn ns-btn-primary" onClick={scrollToForm}>
            Send a message
          </button>

          <Link className="ns-btn ns-btn-ghost" href="/about">
            About NextScenes
          </Link>
        </div>

        <p className="ns-p" style={{ marginTop: 10, maxWidth: 980, opacity: 0.85 }}>
          Prefer email? You can write to{" "}
          <span style={{ fontWeight: 800 }}>contact [at] nextscenes [dot] org</span>.
        </p>
      </section>

      <section className="ns-section ns-section-alt" id="contact-form">
        <h2 className="ns-h2">Send a message</h2>

        <div className="ns-card" style={{ maxWidth: 980 }}>
          {sent ? (
            <>
              <p className="ns-p" style={{ marginBottom: 10 }}>
                Thank you. Your message has been received.
              </p>
              <p className="ns-p" style={{ marginBottom: 0 }}>
                If your matter is urgent, you can also email{" "}
                <span style={{ fontWeight: 800 }}>contact [at] nextscenes [dot] org</span>.
              </p>
            </>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="ns-grid-3" style={{ gap: 12 }}>
                <div style={{ gridColumn: "span 1" }}>
                  <label style={labelStyle}>Your name</label>
                  <input
                    name="name"
                    required
                    className="ns-input"
                    placeholder="Your name"
                    autoComplete="name"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#0f172a")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
                  />
                </div>

                <div style={{ gridColumn: "span 1" }}>
                  <label style={labelStyle}>Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="ns-input"
                    placeholder="you@example.com"
                    autoComplete="email"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#0f172a")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
                  />
                </div>

                <div style={{ gridColumn: "span 1" }}>
                  <label style={labelStyle}>Subject</label>
                  <input
                    name="subject"
                    required
                    className="ns-input"
                    placeholder="What is this about?"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#0f172a")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
                  />
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <label style={labelStyle}>Message</label>
                <textarea
                  name="message"
                  required
                  className="ns-input"
                  placeholder="Write your message with context…"
                  rows={6}
                  style={textAreaStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#0f172a")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
                />
              </div>

              <input
                name="honey"
                tabIndex={-1}
                autoComplete="off"
                style={{
                  position: "absolute",
                  left: -9999,
                  top: -9999,
                  height: 1,
                  width: 1,
                  opacity: 0,
                }}
                aria-hidden="true"
              />

              {err ? (
                <p className="ns-p" style={{ marginTop: 10, color: "#b91c1c", fontWeight: 800 }}>
                  {err}
                </p>
              ) : null}

              <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center" }}>
                <button type="submit" className="ns-btn ns-btn-primary" disabled={loading}>
                  {loading ? "Sending…" : "Send message"}
                </button>

                <span className="ns-p" style={{ marginBottom: 0, opacity: 0.9 }}>
                  Messages are read by humans. Please write clearly and respectfully.
                </span>
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Who should contact us?</h2>

        <div className="ns-grid-3">
          <Card title="Schools and institutions">
            If you represent a school, university, ministry, NGO, foundation, or cultural institution and want to explore using
            NextScenes for educational or cultural programs.
          </Card>

          <Card title="Partners and organizations">
            If you are interested in partnership, sponsorship, or long-term collaboration on cultural, educational, or community projects.
          </Card>

          <Card title="Writers and communities">
            If you want to build a serious community, a writing club, or a long-term creative project on NextScenes.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">What can you contact us about?</h2>

        <div className="ns-grid-3">
          <Card title="Partnerships and programs">
            Institutional cooperation, educational programs, cultural projects, and long-term initiatives.
          </Card>

          <Card title="Using NextScenes in education">
            Classrooms, clubs, youth programs, workshops, and structured learning environments.
          </Card>

          <Card title="General questions">
            Questions about how the platform works, its philosophy, or its governance.
          </Card>
        </div>

        <div className="ns-grid-3" style={{ marginTop: 14 }}>
          <Card title="Safety and moderation concerns">
            If you have concerns about content, behavior, or community safety on the platform.
          </Card>

          <Card title="Media and communication">
            Journalists, researchers, and cultural observers can reach out for information and context.
          </Card>

          <Card title="Other serious inquiries">
            If you are not sure where your question fits, write anyway and we will route it responsibly.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">How we handle messages</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Messages sent to NextScenes are read by humans. We do not promise instant replies, but we do promise thoughtful attention.
          NextScenes is built slowly and carefully, and we treat communication the same way.
        </p>

        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 0 }}>
            Please write clearly, respectfully, and with context. If your message concerns a school, institution, or program, include the name
            of the organization and your role.
          </p>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Related pages</h2>
        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-ghost" href="/partners">
            Partnerships & Institutions
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/safety">
            Safety & Values
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/clubs">
            Clubs & Communities
          </Link>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">In one sentence</h2>
        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 0 }}>
            NextScenes is open to serious conversation with people and institutions who care about culture, education, and meaningful creativity.
          </p>
        </div>
      </section>
    </div>
  );
}
