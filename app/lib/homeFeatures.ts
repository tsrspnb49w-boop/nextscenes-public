// Build: home-features-config-v3
// Purpose: Central control for homepage "Inside NextScenes" section

export const HOME_FEATURES = {
  storyOfTheWeek: {
    label: "Story of the Week",
    title: "The story is already moving",
    description:
      "Someone has already written something you have not seen. Enter now and read what unfolds next.",
    meta: "Live now · Still unfolding",
    cta: "Enter the Story",
    href: "https://app.nextscenes.org/reader-view?storyId=69c8ed091023337bec53061c",
  },

  puzzleOfTheWeek: {
    label: "Puzzle of the Week",
    title: "A puzzle worth solving",
    description:
      "Train your mind with one short mystery. Start now, then explore more.",
    meta: "New every week · All ages",
    cta: "Try this week’s puzzle",
    href: "/mystery250",
  },

  clubSpotlight: {
    label: "Club Spotlight",
    title: "A community that builds seriously",
    description:
      "Writers, readers, and thinkers growing together through practice, discussion, and discipline.",
    meta: "Clubs for every level",
    cta: "Explore clubs",
    href: "/clubs",
  },
} as const;
