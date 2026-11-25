import FirstReadsNewReleaseIcon from "./FirstReadsNewReleaseIcon";
import Image from "next/image";
import Link from "next/link";
import { QUEEN_AMINA_FIRST_READS, queenAminaPublicReadingUrl } from "@/app/lib/firstReadsApprovedBooks";
import styles from "./FirstReadsBookCollection.module.css";

/**
 * First Reads is a collection of authorized reading editions, not the
 * catalogue of commercially published books or private manuscripts.
 */
export default function FirstReadsBookCollection({ language }: { language: "en" | "fr" }) {
  const fr = language === "fr";
  const explore = fr ? "/fr/first-reads/explore" : "/first-reads/explore";
  const home = fr ? "/fr" : "/";
  const readHref = queenAminaPublicReadingUrl();
  const text = fr ? {
    eyebrow: "NEXTSCENES · FIRST READS",
    title: "Collection First Reads",
    lead: "Des livres déjà achevés, présentés à travers des chapitres et des lectures choisies, uniquement avec l’accord de leurs auteurs.",
    back: "Explorer First Reads",
    home: "Accueil",
    heading: "Livres First Reads",
    description: "Cette collection présente des lectures autorisées de manuscrits achevés. Elle est distincte du catalogue des éditions commerciales de NextScenes.",
    status: "CHAPITRE 1 DISPONIBLE",
    synopsis: "Découvrez Queen Amina: Soldier on Horseback de Kola King. Découvrez cette œuvre en anglais dans notre Édition Royale.",
    action: "Lire le livre",
    note: "Le premier chapitre reste accessible au public. Le manuscrit complet reste privé, et chaque épisode doit être autorisé séparément.",
  } : {
    eyebrow: "NEXTSCENES · FIRST READS",
    title: "First Reads Collection",
    lead: "Completed manuscripts introduced through opening chapters and selected installments, only with their authors’ approval.",
    back: "Explore First Reads",
    home: "Homepage",
    heading: "First Reads Books",
    description: "This collection presents author-approved readings from completed manuscripts. It is separate from the NextScenes catalogue of commercially available editions.",
    status: "CHAPTER ONE AVAILABLE",
    synopsis: "Discover Queen Amina: Soldier on Horseback by Kola King. Begin reading in our Royal Reader.",
    action: "Read the Book",
    note: "Chapter One remains available for public reading. The complete manuscript remains private, and each serial requires separate authorization.",
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
        <div className={styles.previewShelf} aria-label={text.heading}>
          <article style={{position:"relative"}} className={styles.placeholderCard} data-first-reads-approved-book="queen-amina">
            <FirstReadsNewReleaseIcon storyId={QUEEN_AMINA_FIRST_READS.id} href={readHref} language={language}/>
            <a href={readHref} className={styles.realCoverLink} aria-label={text.action}>
              <Image src={QUEEN_AMINA_FIRST_READS.cover} alt="Queen Amina: Soldier on Horseback book cover"
                width={160} height={240} unoptimized className={styles.realCover} />
            </a>
            <div className={styles.cardCopy}>
              <span className={styles.status}>{text.status}</span>
              <h3>{QUEEN_AMINA_FIRST_READS.title}</h3>
              <p><strong>{QUEEN_AMINA_FIRST_READS.author}</strong></p>
              <p>{text.synopsis}</p>
              <a href={readHref} className={styles.primaryLink}>{text.action}</a>
            </div>
          </article>
        </div>
        <p className={styles.disclaimer}>{text.note}</p>
      </section>
    </main>
  );
}
