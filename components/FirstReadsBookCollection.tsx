import Link from "next/link";
import styles from "./FirstReadsBookCollection.module.css";

/**
 * Separate from the published-books catalogue.
 * The sample is intentionally not an actual manuscript or public reading.
 * Only add real cards here after their explicit author and release approvals.
 */
export default function FirstReadsBookCollection({ language }: { language: "en" | "fr" }) {
  const fr = language === "fr";
  const explore = fr ? "/fr/first-reads/explore" : "/first-reads/explore";
  const home = fr ? "/fr" : "/";

  const text = fr ? {
    eyebrow: "NEXTSCENES · FIRST READS",
    title: "Collection First Reads",
    lead: "Des livres déjà achevés, présentés à travers des chapitres et des lectures choisies, uniquement avec l’accord de leurs auteurs.",
    back: "Explorer First Reads",
    home: "Accueil",
    heading: "Livres First Reads",
    description: "Cette collection est réservée aux manuscrits achevés sélectionnés pour First Reads. Elle est distincte de notre catalogue de livres déjà publiés.",
    coverTag: "NEXTSCENES",
    coverTitle: "FIRST READS",
    coverFooter: "Un livre bientôt à découvrir",
    placeholderTag: "APERÇU DE LA COLLECTION",
    placeholderTitle: "Votre prochaine lecture arrive bientôt",
    placeholderDescription: "Le premier livre sera présenté ici lorsqu’un auteur aura approuvé sa couverture, sa présentation et les chapitres proposés à la lecture.",
    waiting: "Aucun livre n’est encore disponible dans cette collection.",
    note: "Carte de présentation uniquement. Aucun manuscrit, auteur ou extrait n’est publié ici.",
  } : {
    eyebrow: "NEXTSCENES · FIRST READS",
    title: "First Reads Collection",
    lead: "Completed manuscripts introduced through opening chapters and selected installments, only with their authors’ approval.",
    back: "Explore First Reads",
    home: "Homepage",
    heading: "First Reads Books",
    description: "This collection is reserved for completed manuscripts selected for First Reads. It is separate from our catalogue of previously published books.",
    coverTag: "NEXTSCENES",
    coverTitle: "FIRST READS",
    coverFooter: "A new book is coming",
    placeholderTag: "COLLECTION PREVIEW",
    placeholderTitle: "Your next great read is coming",
    placeholderDescription: "Our first book will appear here once its author has approved the cover, presentation and chapters selected for public reading.",
    waiting: "No books have been released to this collection yet.",
    note: "Preview card only. No manuscript, author or reading excerpt is being published here.",
  };

  return (
    <main className={styles.main} data-first-reads-collection="true">
      <section className={styles.shell}>
        <p className={styles.eyebrow}>{text.eyebrow}</p>
        <h1>{text.title}</h1>
        <p className={styles.lead}>{text.lead}</p>
        <nav className={styles.nav} aria-label={fr ? "Navigation de la collection" : "Collection navigation"}>
          <Link href={explore} className={styles.primaryLink}>{text.back}</Link>
          <Link href={home} className={styles.secondaryLink}>{text.home}</Link>
        </nav>

        <div className={styles.divider} />
        <h2>{text.heading}</h2>
        <p className={styles.description}>{text.description}</p>
        <div className={styles.previewShelf} aria-label={text.placeholderTag}>
          <article className={styles.placeholderCard} data-first-reads-placeholder="true">
            <div className={styles.cover} role="img" aria-label={fr ? "Couverture fictive de présentation First Reads" : "First Reads concept cover, not an actual book"}>
              <span className={styles.coverBrand}>{text.coverTag}</span>
              <span className={styles.coverMark} aria-hidden="true">✧</span>
              <strong>FIRST<br/>READS</strong>
              <small>{text.coverFooter}</small>
            </div>
            <div className={styles.cardCopy}>
              <span className={styles.status}>{text.placeholderTag}</span>
              <h3>{text.placeholderTitle}</h3>
              <p>{text.placeholderDescription}</p>
              <span className={styles.waiting}>{text.waiting}</span>
            </div>
          </article>
        </div>
        <p className={styles.disclaimer}>{text.note}</p>
      </section>
    </main>
  );
}
