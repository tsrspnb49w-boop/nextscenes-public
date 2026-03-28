// Build: home-features-config-v1
// Purpose: Central control for homepage "Inside NextScenes" section

export const HOME_FEATURES = {
  storyOfTheWeek: {
    label: "Story of the Week",
    title: "A doorway into a living storyline",
    description:
      "A featured story that shows how NextScenes grows a book with clarity and responsibility.",
    meta: "Updated weekly · Clean reading",
    cta: "Read the story",
    href: "https://app.nextscenes.org/reader-view?storyId=6999926ee47ac5ae3b58dca4",
  },

  puzzleOfTheWeek: {
    label: "Puzzle of the Week",
    title: "Mystery250 Spotlight",
    description:
      "One short mystery to train attention, logic, and patience. Try it, then explore more.",
    meta: "New every week · All ages",
    cta: "Try this week’s puzzle",
    href: "/mystery250",
  },

  clubSpotlight: {
    label: "Club Spotlight",
    title: "A community worth joining",
    description:
      "Kids, teens, adults, and institutions. Clubs are where habits are formed and craft improves.",
    meta: "Clubs for every level",
    cta: "Explore clubs",
    href: "/clubs",
  },
} as const;
