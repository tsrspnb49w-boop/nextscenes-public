// app/lib/homeFeatures.ts
// Build: home-features-config-v6
// Purpose: Central control for homepage feature blocks

export const HOME_FEATURES = {
  en: {
    bookOfTheWeek: {
      label: "Book of the Week",
      title: "A Living Storyline",
      author: "NextScenes Writers",
      description:
        "A book still unfolding, where each new scene carries visible continuity and consequence.",
      meta: "Live now · Still unfolding",
      cta: "Enter storyline",
      href: "https://app.nextscenes.org/reader-view?storyId=69c8ed091023337bec53061c",
    },

    featuredReading: {
      label: "Book of the Month",
      title: "Anna Karenina",
      author: "Leo Tolstoy",
      description:
        "A searching novel of love, marriage, society, duty, and the price of choices made against the heart.",
      wisdomText:
        "Reading widens the mind, sharpens judgment, and lets us borrow wisdom from lives beyond our own.",
      cta: "Explore the recommendation",
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
      label: "Club Spotlight",
      title: "A community that builds seriously",
      description:
        "Writers, readers, and thinkers growing through practice, discussion, and disciplined creation.",
      meta: "Clubs for every level",
      cta: "Explore clubs",
      href: "/clubs",
    },
  },

  fr: {
    bookOfTheWeek: {
      label: "Livre de la semaine",
      title: "Une histoire vivante",
      author: "Les auteurs de NextScenes",
      description:
        "Un livre encore en train de se déployer, où chaque nouvelle scène porte une continuité visible et ses conséquences.",
      meta: "En cours · Toujours en évolution",
      cta: "Entrer dans le récit",
      href: "https://app.nextscenes.org/reader-view?storyId=69c8ed091023337bec53061c",
    },

    featuredReading: {
      label: "Livre du mois",
      title: "Les Misérables",
      author: "Victor Hugo",
      description:
        "Un grand roman sur la justice, la misère, la compassion, la faute, le pardon et la dignité humaine.",
      wisdomText:
        "La lecture élargit l’esprit, affine le jugement et nous permet d’emprunter la sagesse de vies au-delà de la nôtre.",
      cta: "Découvrir la recommandation",
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
      label: "Club à l’honneur",
      title: "Une communauté qui construit avec rigueur",
      description:
        "Des écrivains, lecteurs et penseurs qui progressent par la pratique, l’échange et une création disciplinée.",
      meta: "Des clubs pour tous les niveaux",
      cta: "Découvrir les clubs",
      href: "/clubs",
    },
  },
} as const;