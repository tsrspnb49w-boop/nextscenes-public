import Image from "next/image";
import Link from "next/link";
import styles from "./DidieBookPage.module.css";

type Language = "en" | "fr";

const DIDIE_KINDLE_AMAZON = "https://www.amazon.com/dp/B0HP3LZL32";
const DIDIE_PAPERBACK_AMAZON = "https://www.amazon.com/dp/B0HKCZF51W";
const COVER = "/images/books/didie/approved-front.webp";

const copy = {
  en: {
    breadcrumb: "A NOVEL BY GODDY OGUZIE",
    category: "HISTORICAL FICTION · EARLY 20TH-CENTURY NIGERIA",
    title: "The Story of Didie",
    opening: "Love beyond custom. A truth buried in silence. A destiny that still demands an answer.",
    intro: "A sweeping story of forbidden love, injustice and the far-reaching consequences of choices made across generations.",
    kindle: "Buy Kindle Edition",
    paperback: "Buy Paperback",
    introLink: "Discover the story",
    edition: "Published in English · Kindle and paperback on Amazon (availability varies by country)",
    theStory: "The Story",
    story: [
      "In the heart of early twentieth-century Nigeria, a gifted young villager named Didie finds himself caught between the demands of tradition and a love that defies the boundaries of his world.",
      "His affection for Uloma, the daughter of a powerful chief, sets in motion events neither could have imagined. What begins as a deeply personal struggle unfolds into a sweeping tale of separation, sacrifice, betrayal, injustice and the enduring power of memory.",
      "From the village paths of Odah to the bustling streets and colonial courts of Lagos, The Story of Didie follows lives transformed by choices, circumstances and the passage of time. Across generations, buried truths linger, old wounds refuse to disappear, and the possibility of reconciliation remains.",
      "It is a story of love tested by society, of lives altered by injustice, and of the extraordinary consequences of decisions made long ago.",
    ],
    themesHeading: "Beyond Love, Tradition and Destiny",
    themes: [
      "What happens when love confronts the authority of tradition? When customs intended to preserve a community become instruments of suffering? And when the choices of one generation determine the burdens inherited by another?",
      "The Story of Didie explores these questions through the intertwined forces of love, family, belief, power and human destiny.",
      "Here, tradition is both a source of identity and a force capable of shaping individual lives. Love inspires courage but cannot always overcome fear, prejudice or injustice. Silence protects certain truths while condemning others to live with their consequences.",
      "And destiny? Is it predetermined, or do human choices, acts of courage and failures of conscience give it direction?",
      "Beyond its historical setting, the novel invites readers to reflect on responsibility, forgiveness, justice and the possibility of reclaiming what once seemed irretrievably lost.",
      "For even when circumstances appear to have settled the course of a life, the human spirit may still challenge what destiny seems to have decreed.",
    ],
    anchor: "A question at the heart of the novel",
    anchorQuote: "Is destiny predetermined, or do human choices, acts of courage and failures of conscience give it direction?",
    highlight1: "A Rich Historical Setting",
    highlightText1: "A story set against the changing world of early twentieth-century Nigeria.",
    highlight2: "Compelling Characters",
    highlightText2: "The consequences of love, silence and injustice reach beyond a single lifetime.",
    highlight3: "A Story That Resonates",
    highlightText3: "Buried truths linger, but the possibility of reconciliation endures.",
    about: "About the Author",
    author: "Goddy Oguzie is a Nigerian writer and cultural thinker whose work explores the meeting point of tradition, justice, memory, and human destiny. His fiction blends historical realism with the spiritual undertones of African storytelling, reimagining the emotional and moral depth of the continent’s past for modern readers.",
    lastHeading: "Discover The Story of Didie",
    lastText: "A journey through love, memory and the choices that shape our destinies.",
    returnHome: "Return to NextScenes",
    languageNote: "Read this presentation in French",
  },
  fr: {
    breadcrumb: "UN ROMAN DE GODDY OGUZIE",
    category: "ROMAN HISTORIQUE · NIGERIA, DÉBUT DU XXe SIÈCLE",
    title: "The Story of Didie",
    opening: "Un amour au-delà des coutumes. Une vérité enfouie dans le silence. Un destin qui réclame encore une réponse.",
    intro: "Une fresque où se mêlent amour interdit, injustice et conséquences de choix dont l’écho traverse les générations.",
    kindle: "Kindle (en anglais)",
    paperback: "Broché (en anglais)",
    introLink: "Découvrir l’histoire",
    edition: "Disponible en anglais sur Amazon aux formats Kindle et broché · Aucune traduction française disponible pour le moment",
    theStory: "L’histoire",
    story: [
      "Au cœur du Nigeria du début du XXe siècle, Didie, un jeune villageois doué, se trouve déchiré entre les exigences de la tradition et un amour qui défie les frontières de son monde.",
      "Son affection pour Uloma, la fille d’un chef puissant, déclenche une suite d’événements qu’aucun d’eux n’aurait pu imaginer. Ce qui commence comme un conflit profondément intime devient une vaste histoire de séparation, de sacrifice, de trahison, d’injustice et de mémoire persistante.",
      "Des sentiers du village d’Odah aux rues animées et aux tribunaux coloniaux de Lagos, The Story of Didie suit des existences transformées par les choix, les circonstances et le passage du temps. D’une génération à l’autre, des vérités enfouies demeurent, de vieilles blessures refusent de disparaître et l’espoir d’une réconciliation subsiste.",
      "C’est une histoire d’amour mis à l’épreuve par la société, de vies bouleversées par l’injustice et des conséquences extraordinaires de décisions prises bien des années auparavant.",
    ],
    themesHeading: "Au-delà de l’amour, des traditions et du destin",
    themes: [
      "Que se passe-t-il lorsque l’amour se heurte à l’autorité de la tradition ? Lorsque des coutumes censées protéger une communauté deviennent des instruments de souffrance ? Et lorsque les choix d’une génération déterminent les fardeaux transmis à la suivante ?",
      "The Story of Didie explore ces questions à travers les forces entremêlées de l’amour, de la famille, des croyances, du pouvoir et du destin humain.",
      "Ici, la tradition est à la fois une source d’identité et une force capable de façonner les vies. L’amour inspire le courage, mais ne triomphe pas toujours de la peur, des préjugés ou de l’injustice. Le silence protège certaines vérités tandis qu’il condamne d’autres personnes à vivre avec leurs conséquences.",
      "Et le destin ? Est-il tracé d’avance, ou nos choix, nos actes de courage et nos manquements à la conscience lui donnent-ils sa direction ?",
      "Au-delà de son cadre historique, le roman invite à réfléchir à la responsabilité, au pardon, à la justice et à la possibilité de retrouver ce qui semblait irrémédiablement perdu.",
      "Car même lorsque les circonstances paraissent avoir fixé le cours d’une existence, l’esprit humain peut encore défier ce que le destin semblait avoir décrété.",
    ],
    anchor: "Une question au cœur du roman",
    anchorQuote: "Le destin est-il tracé d’avance, ou nos choix, nos actes de courage et nos manquements à la conscience lui donnent-ils sa direction ?",
    highlight1: "Un cadre historique riche",
    highlightText1: "Un récit inscrit dans les bouleversements du Nigeria du début du XXe siècle.",
    highlight2: "Des personnages captivants",
    highlightText2: "Les conséquences de l’amour, du silence et de l’injustice dépassent une seule vie.",
    highlight3: "Une histoire qui résonne",
    highlightText3: "Des vérités restent enfouies, mais l’espoir d’une réconciliation demeure.",
    about: "À propos de l’auteur",
    author: "Goddy Oguzie est un écrivain et penseur culturel nigérian dont l’œuvre explore la rencontre entre tradition, justice, mémoire et destin humain. Ses récits associent le réalisme historique aux dimensions spirituelles de la tradition orale africaine, offrant aux lecteurs d’aujourd’hui une réflexion sur la profondeur émotionnelle et morale du passé du continent.",
    lastHeading: "Découvrez The Story of Didie",
    lastText: "Un voyage à travers l’amour, la mémoire et les choix qui façonnent nos destins.",
    returnHome: "Retour à NextScenes",
    languageNote: "Read this presentation in English",
  },
} as const;

export default function DidieBookPage({ language }: { language: Language }) {
  const t = copy[language];
  const isFrench = language === "fr";
  const alternate = isFrench ? "/books/didie" : "/fr/books/didie";
  return (
    <div className={styles.page} lang={language}>
      <section className={styles.hero} aria-label={t.title}>
        <div className={styles.heroLandscapeLeft} aria-hidden="true" />
        <div className={styles.heroLandscapeRight} aria-hidden="true" />
        <div className={styles.wrap}>
          <div className={styles.heroGrid}>
            <div className={styles.coverFrame}>
              <span className={styles.bookSpine} aria-hidden="true" />
              <Image priority src={COVER} alt="The Story of Didie — English edition book cover by Goddy Oguzie" width={1024} height={1536} sizes="(max-width: 760px) 60vw, 310px" className={styles.cover} />
            </div>
            <div className={styles.heroText}>
              <div className={styles.eyebrow}>{t.breadcrumb}</div>
              <div className={styles.genre}>{t.category}</div>
              <h1>{t.title}</h1>
              <p className={styles.heroQuote}>{t.opening}</p>
              <p className={styles.intro}>{t.intro}</p>
              <div className={styles.actions}>
                <a className={`${styles.button} ${styles.primary}`} href={DIDIE_KINDLE_AMAZON} target="_blank" rel="noopener noreferrer"><span className={styles.amazonMark} aria-hidden="true">a</span>{t.kindle} <span aria-hidden="true">→</span></a>
                <a className={`${styles.button} ${styles.secondary}`} href={DIDIE_PAPERBACK_AMAZON} target="_blank" rel="noopener noreferrer"><span className={styles.amazonMark} aria-hidden="true">a</span>{t.paperback} <span aria-hidden="true">→</span></a>
              </div>
              <a className={styles.storyLink} href="#the-story">{t.introLink} <span aria-hidden="true">↓</span></a>
              <p className={styles.edition}>{t.edition}</p>
              <Link className={styles.languageSwitch} href={alternate}>{t.languageNote} <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.highlights} aria-label={isFrench ? "Le monde du roman" : "Inside the novel"}>
        <div className={`${styles.wrap} ${styles.highlightGrid}`}>
          <article><span className={styles.highlightSymbol}><svg viewBox="0 0 32 32" width="27" height="27" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 29V13m0 7c-7-1-11-7-10-15 7 0 13 4 13 12m-3 10c7-1 11-7 10-16-7 0-13 4-13 12"/><path d="M13 14 9 10m10 8 4-4"/></svg></span><h2>{t.highlight1}</h2><p>{t.highlightText1}</p></article>
          <article><span className={styles.highlightSymbol}><svg viewBox="0 0 32 32" width="27" height="27" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="4"/><circle cx="22" cy="12" r="3.5"/><path d="M3.5 27v-3c0-5 3.2-8 7.5-8s7.5 3 7.5 8v3H3.5Zm15-9c4.4-.4 8 2.5 8 7v2h-5"/></svg></span><h2>{t.highlight2}</h2><p>{t.highlightText2}</p></article>
          <article><span className={styles.highlightSymbol}><svg viewBox="0 0 32 32" width="27" height="27" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8c-4-3.6-9-4-13-2v21c4-2 9-1.8 13 1m0-20c4-3.6 9-4 13-2v21c-4-2-9-1.8-13 1V8Z"/><path d="M7 11c3-.6 5.5.2 7 1.4m4 .1c1.5-1.2 4-2 7-1.4"/></svg></span><h2>{t.highlight3}</h2><p>{t.highlightText3}</p></article>
        </div>
      </section>
      <section className={styles.storySection} id="the-story" aria-labelledby="story-title">
        <div className={styles.readingWrap}>
          <div className={styles.sectionLabel}>{isFrench ? "LE ROMAN" : "THE NOVEL"}</div>
          <h2 id="story-title">{t.theStory}</h2>
          {t.story.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
        </div>
      </section>
      <section className={styles.themesSection} aria-labelledby="themes-title">
        <div className={styles.wrap}>
          <div className={styles.themesGrid}>
            <div className={styles.themeText}>
              <div className={styles.sectionLabel}>{isFrench ? "QUESTIONS QUI DEMEURENT" : "QUESTIONS THAT ENDURE"}</div>
              <h2 id="themes-title">{t.themesHeading}</h2>
              {t.themes.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </div>
            <aside className={styles.pullQuote} aria-label={t.anchor}>
              <span aria-hidden="true" className={styles.quoteMark}>“</span>
              <div className={styles.sectionLabel}>{t.anchor}</div>
              <blockquote>{t.anchorQuote}</blockquote>
              <span className={styles.quoteRule} aria-hidden="true" />
            </aside>
          </div>
        </div>
      </section>
      <section className={styles.authorSection} aria-labelledby="author-title">
        <div className={`${styles.wrap} ${styles.authorInner}`}>
          <div className={styles.authorMotif} aria-hidden="true"><span>✦</span><span>❦</span></div>
          <div>
            <div className={styles.sectionLabel}>{isFrench ? "LA VOIX DERRIÈRE L’HISTOIRE" : "BEHIND THE STORY"}</div>
            <h2 id="author-title">{t.about}</h2>
            <p>{t.author}</p>
          </div>
        </div>
      </section>
      <section className={styles.finalSection}>
        <div className={`${styles.wrap} ${styles.finalInner}`}>
          <div>
            <h2>{t.lastHeading}</h2><p>{t.lastText}</p>
            {isFrench && <p className={styles.finalEdition}>{t.edition}</p>}
          </div>
          <div className={styles.actions}>
            <a className={`${styles.button} ${styles.primary}`} href={DIDIE_KINDLE_AMAZON} target="_blank" rel="noopener noreferrer"><span className={styles.amazonMark} aria-hidden="true">a</span>{t.kindle} <span aria-hidden="true">→</span></a>
            <a className={`${styles.button} ${styles.secondary}`} href={DIDIE_PAPERBACK_AMAZON} target="_blank" rel="noopener noreferrer"><span className={styles.amazonMark} aria-hidden="true">a</span>{t.paperback} <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className={styles.returnLink}><Link href={isFrench ? "/fr" : "/"}>← {t.returnHome}</Link></div>
      </section>
    </div>
  );
}
