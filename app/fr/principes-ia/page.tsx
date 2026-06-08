import Link from "next/link";

export const metadata = {
  title: "NextScenes et l’intelligence artificielle | NextScenes",
  description:
    "NextScenes utilise l’intelligence artificielle pour soutenir la créativité humaine, tout en gardant le jugement et la responsabilité de l’auteur au centre.",
};

export default function FrAiPrinciplesPage() {
  return (
    <div className="ns-page ns-compact">
      <section style={{ padding: "10px 0 8px" }}>
        <h1 className="ns-h1">NextScenes et l’intelligence artificielle</h1>
        <p className="ns-subtitle" style={{ maxWidth: 920 }}>
          NextScenes croit que l’écriture d’un livre est un parcours profondément
          humain. L’intelligence artificielle peut accompagner ce parcours, mais
          l’imagination, le jugement et la décision finale restent avec l’auteur.
        </p>

        <div className="ns-trust-strip" style={{ marginTop: 12 }}>
          <span>La créativité humaine d’abord</span>
          <span>L’assistance de l’IA ensuite</span>
          <span>La décision finale à l’auteur</span>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Un parcours humain</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes croit que l’écriture d’un livre est un parcours profondément
          humain.
        </p>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Une histoire n’est pas seulement un manuscrit terminé. C’est un chemin
          fait d’imagination, d’effort, de doute, de révision, de découverte et
          de jugement, qui conduit l’auteur de la première idée jusqu’à l’œuvre
          finale. Sur ce chemin, l’auteur apporte son émotion, sa mémoire, sa
          conscience, sa culture, son expérience et son intention. Ces qualités
          humaines restent au cœur du type de narration que NextScenes souhaite
          encourager.
        </p>
        <p className="ns-p" style={{ maxWidth: 980, marginBottom: 0 }}>
          L’intelligence artificielle peut accompagner ce parcours de manière
          utile et significative.
        </p>
      </section>

      <section className="ns-section">
        <div className="ns-card" style={{ padding: 22 }}>
          <h2 className="ns-h2">Notre principe directeur</h2>
          <p
            className="ns-p"
            style={{
              maxWidth: 900,
              fontSize: "1.08rem",
              fontWeight: 800,
              marginBottom: 0,
            }}
          >
            La créativité humaine d’abord. L’assistance de l’IA ensuite. La
            décision finale à l’auteur.
          </p>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Comment l’IA peut accompagner les auteurs</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          NextScenes peut utiliser l’IA pour aider les écrivains à améliorer la
          grammaire, la clarté, la structure, la continuité, les résumés, les
          traductions, l’adaptation à l’âge des lecteurs, la compréhension des
          textes et la sécurité du contenu. L’IA peut signaler des phrases
          faibles, des passages confus, des idées répétées, d’éventuelles
          contradictions ou un langage qui ne correspond pas aux standards de la
          plateforme.
        </p>
        <p className="ns-p" style={{ maxWidth: 980, marginBottom: 0 }}>
          Sur NextScenes, l’IA sert d’assistante à l’écrivain.
        </p>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">L’auteur demeure responsable</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          L’IA ne possède pas l’histoire. Elle n’approuve pas l’histoire. Elle
          ne décide pas de ce qui devient final. L’écrivain demeure responsable
          de l’imagination, du message, du jugement moral et de l’œuvre achevée.
        </p>
        <p className="ns-p" style={{ maxWidth: 980, marginBottom: 0 }}>
          NextScenes est conçu pour rendre le processus d’écriture visible,
          réfléchi et enrichissant. Nous voulons que les lecteurs et les
          utilisateurs accompagnent les auteurs pendant que les histoires
          grandissent, scène après scène, décision après décision, jusqu’à ce
          qu’un livre trouve sa véritable forme.
        </p>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">En une phrase</h2>
        <p
          className="ns-p"
          style={{ maxWidth: 980, fontWeight: 800, marginBottom: 0 }}
        >
          Sur NextScenes, les livres sont écrits par des êtres humains. L’IA
          facilite le parcours.
        </p>
      </section>

      <div className="ns-actions">
        <Link className="ns-btn ns-btn-primary" href="/fr/auteurs">
          Pour les auteurs
        </Link>
        <Link className="ns-btn ns-btn-ghost" href="/fr/about">
          À propos de NextScenes
        </Link>
      </div>
    </div>
  );
}
