"use client";

import { useEffect } from "react";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://app.nextscenes.org";

export default function EnterPageFR() {

  useEffect(() => {

    const t = setTimeout(() => {
      window.location.href = APP_URL;
    }, 600);

    return () => clearTimeout(t);

  }, []);

  return (

    <main className="ns-page" style={{ textAlign: "center", paddingTop: "80px" }}>

      <img
        src="/assets/nextscenes-logo.png"
        width={54}
        height={54}
        alt="NextScenes"
        style={{ margin: "0 auto 16px auto" }}
      />

      <h1 className="ns-h2">Entrée dans NextScenes…</h1>

      <p className="ns-subtitle">

        Préparation de votre espace d’écriture

      </p>

      <div style={{ marginTop: "18px", opacity: 0.6 }}>

        ● ● ●

      </div>

    </main>

  );
}