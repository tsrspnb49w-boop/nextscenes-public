import Image from "next/image";
import Link from "next/link";
import type { PublicBook } from "@/app/lib/seoPublishedBooks";
import styles from "./DidieBookPage.module.css";

const presentation = {
  en: {
    eyebrow: "A NOVEL BY KOLA KING",
    category: "HISTORICAL FICTION · COLONIAL-ERA WEST AFRICA",
    opening: "A story of love, friendship and the obligations that bind a community.",
    intro: "In Tekota, a fictional town in Songhaland, Zakka and Matta discover how difficult it can be to choose their own future when tradition has not released the past.",
    amazon: "View paperback on Amazon",
    storyLink: "Discover the story",
    availability: "Published in English · Paperback available on Amazon",
    languageLink: "Lire cette présentation en français",
    highlightsLabel: "Within the story",
    highlights: [
      ["Love and loyalty", "Zakka and Matta's hopes face the claims of an unresolved marriage."],
      ["Custom and obligation", "The return of a bride price becomes central to the choices before them."],
      ["A changing world", "Fictional Songhaland provides a setting for questions about tradition and personal freedom."],
    ],
    storyLabel: "THE NOVEL",
    storyTitle: "A Place in the Sun",
    themesLabel: "THE QUESTIONS BEHIND THE STORY",
    themesTitle: "When love meets tradition",
    themes: [
      "In Tekota, the bonds of family, marriage and community carry real authority. They give people a place to belong, but they also determine what is expected of them when private wishes conflict with established custom.",
      "At the heart of the novel is a difficult question: how can people honour the ties that have shaped their lives while confronting the suffering those same obligations may cause? The choices facing Zakka, Matta and Gora bring love, loyalty and responsibility into sharp conflict.",
    ],
    question: "What happens when the right to choose a future is challenged by obligations from the past?",
    authorLabel: "MEET THE AUTHOR",
    authorTitle: "Kola King",
    publicationLabel: "ABOUT THIS EDITION",
    editionText: "Prepared for publication at NextScenes.",
    pages: "pages",
    format: "Format",
    language: "Language",
    languageValue: "English",
    closing: "Discover A Place in the Sun",
    closingLine: "A novel about the choices we make and the customs we inherit.",
    catalogue: "Explore published books",
  },
  fr: {
    eyebrow: "UN ROMAN DE KOLA KING",
    category: "FICTION HISTORIQUE · AFRIQUE DE L’OUEST À L’ÉPOQUE COLONIALE",
    opening: "Une histoire d’amour, d’amitié et d’obligations qui façonnent la vie d’une communauté.",
    intro: "À Tekota, ville fictive du Songhaland, Zakka et Matta découvrent combien il peut être difficile de choisir leur avenir lorsque la tradition n’a pas réglé le passé.",
    amazon: "Voir le livre sur Amazon",
    storyLink: "Découvrir l’histoire",
    availability: "Roman publié en anglais · Broché disponible sur Amazon",
    languageLink: "Read this presentation in English",
    highlightsLabel: "Au cœur du roman",
    highlights: [
      ["Amour et fidélité", "L’espoir de Zakka et Matta se heurte aux revendications liées à un mariage non résolu."],
      ["Coutume et devoir", "La restitution du prix de la fiancée devient déterminante pour leur avenir."],
      ["Un monde en mutation", "Le Songhaland imaginaire sert de cadre à une réflexion sur la tradition et la liberté de choisir."],
    ],
    storyLabel: "LE ROMAN",
    storyTitle: "A Place in the Sun",
    themesLabel: "LES QUESTIONS AU CŒUR DU RÉCIT",
    themesTitle: "Lorsque l’amour rencontre la tradition",
    themes: [
      "À Tekota, les liens familiaux, le mariage et la communauté conservent une grande autorité. Ils apportent un sentiment d’appartenance, mais imposent aussi des obligations lorsque les désirs personnels se heurtent aux coutumes.",
      "Le roman soulève une question difficile : comment respecter les liens qui nous ont façonnés tout en reconnaissant les souffrances que certaines obligations peuvent engendrer ? Les choix de Zakka, Matta et Gora opposent amour, fidélité et responsabilité.",
    ],
    question: "Que devient la liberté de choisir son avenir lorsque les obligations du passé demeurent ?",
    authorLabel: "RENCONTRE AVEC L’AUTEUR",
    authorTitle: "Kola King",
    publicationLabel: "À PROPOS DE CETTE ÉDITION",
    editionText: "Préparé pour publication avec NextScenes.",
    pages: "pages",
    format: "Format",
    language: "Langue",
    languageValue: "Anglais",
    closing: "Découvrez A Place in the Sun",
    closingLine: "Un roman sur nos choix et les coutumes dont nous héritons.",
    catalogue: "Découvrir les livres publiés",
  },
} as const;

export default function APlaceInTheSunBookPage({ book }: { book: PublicBook }) {
  const fr = book.language === "fr";
  const t = presentation[book.language];
  const story = book.overview || [];
  const catalogue = fr ? "/fr/books" : "/books";

  return (
    <div className={styles.page} lang={book.language}>
      <section className={styles.hero} aria-label={book.title}>
        <div className={styles.wrap}>
          <div className={styles.heroGrid}>
            <div className={styles.coverFrame}>
              <span className={styles.bookSpine} aria-hidden="true" />
              <Image
                priority
                src={book.cover}
                alt={fr ? "Couverture du roman A Place in the Sun de Kola King" : "A Place in the Sun by Kola King, paperback front cover"}
                width={682}
                height={1024}
                sizes="(max-width: 650px) 60vw, 284px"
                className={styles.cover}
              />
            </div>
            <div className={styles.heroText}>
              <div className={styles.eyebrow}>{t.eyebrow}</div>
              <div className={styles.genre}>{t.category}</div>
              <h1>{book.title}</h1>
              <p className={styles.heroQuote}>{t.opening}</p>
              <p className={styles.intro}>{t.intro}</p>
              <div className={styles.actions}>
                <a className={[styles.button, styles.primary].join(" ")} href={book.amazonSearchUrl} target="_blank" rel="noopener noreferrer">
                  <span className={styles.amazonMark} aria-hidden="true">a</span>{t.amazon}
                </a>
                <a className={[styles.button, styles.secondary].join(" ")} href="#the-story">{t.storyLink}</a>
              </div>
              <p className={styles.edition}>{t.availability}</p>
              <Link className={styles.languageSwitch} href={book.alternateHref}>{t.languageLink}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.highlights} aria-label={t.highlightsLabel}>
        <div className={[styles.wrap, styles.highlightGrid].join(" ")}>
          {t.highlights.map(([title, description], index) => (
            <article key={title}>
              <span className={styles.highlightSymbol} aria-hidden="true">{index + 1}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="the-story" className={styles.storySection} aria-labelledby="place-story-title">
        <div className={styles.readingWrap}>
          <div className={styles.sectionLabel}>{t.storyLabel}</div>
          <h2 id="place-story-title">{t.storyTitle}</h2>
          {story.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
        </div>
      </section>

      <section className={styles.themesSection} aria-labelledby="place-themes-title">
        <div className={styles.wrap}>
          <div className={styles.themesGrid}>
            <div className={styles.themeText}>
              <div className={styles.sectionLabel}>{t.themesLabel}</div>
              <h2 id="place-themes-title">{t.themesTitle}</h2>
              {t.themes.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </div>
            <aside className={styles.pullQuote}>
              <div className={styles.sectionLabel}>{t.themesLabel}</div>
              <blockquote>{t.question}</blockquote>
              <span className={styles.quoteRule} aria-hidden="true" />
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.authorSection} aria-labelledby="place-author-title">
        <div className={styles.wrap}>
          <div className={styles.authorInner}>
            <div className={styles.authorMotif} aria-hidden="true">KK</div>
            <div>
              <div className={styles.sectionLabel}>{t.authorLabel}</div>
              <h2 id="place-author-title">{t.authorTitle}</h2>
              <p>{book.authorBio}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.finalSection} aria-labelledby="place-edition-title">
        <div className={styles.wrap}>
          <div className={styles.finalInner}>
            <div>
              <div className={styles.sectionLabel}>{t.publicationLabel}</div>
              <h2 id="place-edition-title">{t.closing}</h2>
              <p>{t.closingLine}</p>
              <p className={styles.finalEdition}>{t.editionText}</p>
              <p className={styles.finalEdition}>
                {t.language}: {t.languageValue} · {t.format}: {book.format} · {book.pages} {t.pages}
                {book.isbn ? " · ISBN " + book.isbn : ""}
              </p>
            </div>
            <div className={styles.actions}>
              <a className={[styles.button, styles.primary].join(" ")} href={book.amazonSearchUrl} target="_blank" rel="noopener noreferrer">
                <span className={styles.amazonMark} aria-hidden="true">a</span>{t.amazon}
              </a>
            </div>
          </div>
          <p className={styles.returnLink}><Link href={catalogue}>{t.catalogue}</Link></p>
        </div>
      </section>
    </div>
  );
}
