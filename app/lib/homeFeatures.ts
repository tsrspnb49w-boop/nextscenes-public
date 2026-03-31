// Build: home-features-config-v2
// Purpose: Central control for homepage "Inside NextScenes" section

export const HOME_FEATURES = {
  storyOfTheWeek: {
    label: "Story of the Week",
    title: "The story is already moving. You are late.",
description:
  "Someone has already written the last line you haven’t seen. The next turn is waiting. Enter now and read what is unfolding before it changes again.",
meta: "Live now · Still unfolding",
cta: "Enter the Story",
    href: "https://app.nextscenes.org/reader-view?storyId=69c8ed091023337bec53061c",
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
