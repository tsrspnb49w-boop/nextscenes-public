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

console.log("NEXT_PUBLIC_API_URL =", process.env.NEXT_PUBLIC_API_URL);


function s(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

export default function FrContactPage() {
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
      setErr("Veuillez remplir tous les champs.");
      return;
    }

    if (payload.message.length > 5000) {
      setErr("Votre message est trop long. Merci de le raccourcir.");
      return;
    }

    if (payload.honey) {
      setSent(true);
      form.reset();
      scrollToForm();
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
        setErr(data?.error || "Nous n’avons pas pu envoyer votre message. Veuillez réessayer.");
        setLoading(false);
        return;
      }

      setSent(true);
      form.reset();
      setLoading(false);
      scrollToForm();
    } catch (e2) {
      setErr("Erreur réseau. Veuillez réessayer.");
      setLoading(false);
    }
  }

  return (
    <div className="ns-page">
      <section style={{ padding: "10px 0 8px" }}>
        <h1 className="ns-h1">Contact</h1>
        <p className="ns-subtitle" style={{ maxWidth: 980 }}>
          NextScenes est une plateforme culturelle et éducative sérieuse. Nous accueillons des messages
          réfléchis de la part des écoles, institutions, partenaires, communautés et personnes qui souhaitent
          nous comprendre ou travailler avec nous.
        </p>

        <div className="ns-hero-cta">
          <button type="button" className="ns-btn ns-btn-primary" onClick={scrollToForm}>
            Envoyer un message
          </button>

          <Link className="ns-btn ns-btn-ghost" href="/fr/about">
            À propos de NextScenes
          </Link>
        </div>

        <p className="ns-p" style={{ marginTop: 10, maxWidth: 980, opacity: 0.85 }}>
          Par email : <span style={{ fontWeight: 800 }}>contact [at] nextscenes [dot] org</span>
        </p>
      </section>

      <section className="ns-section ns-section-alt" id="contact-form">
        <h2 className="ns-h2">Envoyer un message</h2>

        <div className="ns-card" style={{ maxWidth: 980 }}>
          {sent ? (
            <>
              <p className="ns-p" style={{ marginBottom: 10 }}>
                Merci. Votre message a bien été reçu.
              </p>
              <p className="ns-p" style={{ marginBottom: 0 }}>
                Si votre demande est urgente, vous pouvez aussi écrire à{" "}
                <span style={{ fontWeight: 800 }}>contact [at] nextscenes [dot] org</span>.
              </p>
            </>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="ns-grid-3" style={{ gap: 12 }}>
                <div style={{ gridColumn: "span 1" }}>
                  <label style={labelStyle}>Votre nom</label>
                  <input
                    name="name"
                    required
                    className="ns-input"
                    placeholder="Votre nom"
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
                    placeholder="vous@exemple.com"
                    autoComplete="email"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#0f172a")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
                  />
                </div>

                <div style={{ gridColumn: "span 1" }}>
                  <label style={labelStyle}>Sujet</label>
                  <input
                    name="subject"
                    required
                    className="ns-input"
                    placeholder="De quoi s’agit-il ?"
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
                  placeholder="Écrivez votre message avec du contexte…"
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
                  {loading ? "Envoi…" : "Envoyer"}
                </button>

                <span className="ns-p" style={{ marginBottom: 0, opacity: 0.9 }}>
                  Les messages sont lus par des humains. Merci d’écrire clairement et avec respect.
                </span>
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Qui devrait nous contacter ?</h2>

        <div className="ns-grid-3">
          <Card title="Écoles et institutions">
            Si vous représentez une école, une université, un ministère, une ONG, une fondation ou une
            institution culturelle et souhaitez explorer l’usage de NextScenes pour des programmes éducatifs
            ou culturels.
          </Card>

          <Card title="Partenaires et organisations">
            Si vous êtes intéressé par un partenariat, un sponsoring, ou une collaboration durable sur des
            projets culturels, éducatifs ou communautaires.
          </Card>

          <Card title="Auteurs et communautés">
            Si vous voulez construire une communauté sérieuse, un club d’écriture, ou un projet créatif de
            long terme sur NextScenes.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">À propos de quoi pouvez-vous nous écrire ?</h2>

        <div className="ns-grid-3">
          <Card title="Partenariats et programmes">
            Coopération institutionnelle, programmes éducatifs, projets culturels et initiatives de long terme.
          </Card>

          <Card title="Utiliser NextScenes dans l’éducation">
            Classes, clubs, programmes jeunesse, ateliers et environnements d’apprentissage structurés.
          </Card>

          <Card title="Questions générales">
            Questions sur le fonctionnement de la plateforme, sa philosophie ou sa gouvernance.
          </Card>
        </div>

        <div className="ns-grid-3" style={{ marginTop: 14 }}>
          <Card title="Sécurité et modération">
            Si vous avez des préoccupations concernant du contenu, des comportements, ou la sécurité de la
            communauté sur la plateforme.
          </Card>

          <Card title="Médias et communication">
            Journalistes, chercheurs et observateurs culturels peuvent nous contacter pour des informations et du contexte.
          </Card>

          <Card title="Autres demandes sérieuses">
            Si vous n’êtes pas sûr de la catégorie, écrivez quand même. Nous orienterons votre demande avec responsabilité.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Comment nous traitons les messages</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Les messages envoyés à NextScenes sont lus par des humains. Nous ne promettons pas des réponses
          instantanées, mais nous promettons une attention sérieuse. NextScenes se construit lentement et
          avec soin, et nous traitons la communication de la même manière.
        </p>

        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 0 }}>
            Écrivez clairement, avec respect, et avec du contexte. Si votre message concerne une école, une
            institution ou un programme, indiquez le nom de l’organisation et votre rôle.
          </p>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Pages liées</h2>
        <div className="ns-section-cta">
          <Link className="ns-btn ns-btn-ghost" href="/fr/partners">
            Partenariats & Institutions
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/fr/safety">
            Sécurité & Valeurs
          </Link>
          <Link className="ns-btn ns-btn-ghost" href="/fr/clubs">
            Clubs & Communautés
          </Link>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">En une phrase</h2>
        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 0 }}>
            NextScenes est ouvert aux échanges sérieux avec les personnes et les institutions qui se soucient
            de la culture, de l’éducation et d’une créativité porteuse de sens.
          </p>
        </div>
      </section>
    </div>
  );
}
