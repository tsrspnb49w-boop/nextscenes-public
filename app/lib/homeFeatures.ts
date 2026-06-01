// app/lib/homeFeatures.ts
// Build: home-features-config-v7
// Purpose: Central control for homepage feature blocks

export const HOME_FEATURES = {
  en: {
    bookOfTheWeek: {
      label: "Featured Story",
      title: "A Living Storyline",
      author: "NextScenes Writers",
      description:
        "A story still unfolding, where each approved scene carries continuity, consequence, and creative care.",
      meta: "Live now · Still unfolding",
      cta: "Enter storyline",
      href: "https://app.nextscenes.org/reader-view?storyId=69c8ed091023337bec53061c",
    },

    featuredReading: {
      label: "Featured Reading / Book of the Month",
      title: "Anna Karenina",
      author: "Leo Tolstoy",
      description:
        "A searching novel of love, marriage, society, duty, and the price of choices made against the heart.",
      wisdomText:
        "A good book does not only entertain. It trains attention, awakens judgment, and reminds the heart what is worth protecting.",
      cta: "",
      href: "",
      cover: "/images/featured-reading/reading-wisdom.webp",
      imageAlt: "Open books representing the wisdom gained through reading",
    },

    puzzleOfTheWeek: {
      label: "Puzzle of the Week",
      title: "A puzzle worth solving",
      description:
        "A short mystery to sharpen the mind without clutter or noise.",
      meta: "New every week · All ages",
      cta: "Try this week’s puzzle",
      href: "/mystery250",
    },

    clubSpotlight: {
      label: "Community",
      title: "A platform that builds seriously",
      description:
        "Writers, readers, and thoughtful contributors growing through disciplined creation and careful participation.",
      meta: "Readers · Writers · Contributors",
      cta: "Enter NextScenes",
      href: "https://app.nextscenes.org",
    },
  },

  fr: {
    bookOfTheWeek: {
      label: "Récit à découvrir",
      title: "Une histoire vivante",
      author: "Les auteurs de NextScenes",
      description:
        "Une histoire encore en train de se déployer, où chaque scène approuvée porte une continuité, des conséquences et un vrai soin créatif.",
      meta: "En cours · Toujours en évolution",
      cta: "Entrer dans le récit",
      href: "https://app.nextscenes.org/reader-view?storyId=69c8ed091023337bec53061c",
    },

    featuredReading: {
      label: "Lecture du mois",
      title: "Les Misérables",
      author: "Victor Hugo",
      description:
        "Un grand roman sur la justice, la misère, la compassion, la faute, le pardon et la dignité humaine.",
      wisdomText:
        "Un bon livre ne se contente pas de divertir. Il éduque l’attention, réveille le jugement et rappelle au cœur ce qui mérite d’être protégé.",
      cta: "",
      href: "",
      cover: "/images/featured-reading/reading-wisdom.webp",
      imageAlt: "Livres ouverts représentant la sagesse acquise par la lecture",
    },

    puzzleOfTheWeek: {
      label: "Énigme de la semaine",
      title: "Une énigme qui mérite d’être résolue",
      description:
        "Un mystère court pour aiguiser l’esprit, sans bruit ni distraction.",
      meta: "Nouveau chaque semaine · Tous âges",
      cta: "Essayez l’énigme de la semaine",
      href: "/mystery250",
    },

    clubSpotlight: {
      label: "Communauté",
      title: "Une plateforme qui construit avec sérieux",
      description:
        "Des écrivains, lecteurs et contributeurs attentifs qui progressent par une création disciplinée et une participation réfléchie.",
      meta: "Lecteurs · Auteurs · Contributeurs",
      cta: "Entrer dans NextScenes",
      href: "https://app.nextscenes.org",
    },
  },
} as const;