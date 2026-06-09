import type { MysteryPuzzle } from "./types";

export const mysteryPuzzlesEn: MysteryPuzzle[] = [
  {
    id: "m250-007",
    slug: "the-library-break-in",
    title: "The Library Break-In",
    setup:
      "At dawn, the librarian found the study locked from the inside. A rare manuscript was missing. The owner claimed that a thief had broken in through the window during the night, stolen the manuscript, and escaped the same way. The room looked disturbed. A chair had been knocked over. Papers were scattered across the floor. The window was cracked, and broken glass could be seen near it. But one detail showed that the break-in had been staged.",
    question: "What clue proves the break-in was staged?",
    options: [
      "The muddy footprints stop near the bookshelf.",
      "The room was locked from the inside.",
      "The broken glass is outside the window, not inside the room.",
      "The overturned chair shows there was no real struggle.",
    ],
    answer: "The broken glass is outside the window, not inside the room.",
    explanation:
      "If someone had broken the window from outside to enter the study, most of the glass would have fallen inside the room. Since the broken glass is outside, the window was most likely broken from inside the study to fake a break-in.",
    difficulty: "medium",
    imageUrl: "/images/mystery250/Mystery250_Library_Break_In_1600x900.png",
    imageAlt:
      "A branded Mystery250 library break-in puzzle poster showing a locked study, broken window, scattered papers, and glass outside the window.",
    active: true,
  },
  {
    id: "m250-006",
    slug: "the-one-way-footprints",
    title: "The One-Way Footprints",
    setup:
      "After a night of fresh snowfall, a farmer saw a single trail of footprints leading from the road straight to his locked barn. There were no footprints leading away. He hurried to the barn, opened it, and found no one inside.",
    question: "How was that possible?",
    answer:
      "The trail only appeared to lead into the barn. The person had walked backward from the barn toward the road.",
    explanation:
      "Because the footprints faced the barn, the farmer assumed the person had entered it. In truth, the person had walked backward away from the barn, making the trail look as if it led toward the door.",
    difficulty: "medium",
    imageUrl: "/images/mystery250/the-one-way-footprints.png",
    imageAlt:
      "A snowy farmyard with a locked barn, one trail of footprints, and a puzzled farmer.",
    active: true,
  },
  {
    id: "m250-001",
    slug: "vanishing-necklace",
    title: "The Vanishing Necklace",
    setup:
      "At a family dinner, a valuable necklace disappears from the hostess's bedroom. The room was locked when the guests arrived. Only four people had entered the house before the theft was discovered: the maid, the gardener, the hostess, and her sister. No window was broken, and nothing else was missing.",
    clues: [
      "The hostess wore the necklace earlier that evening.",
      "The maid says she cleaned the bedroom in the afternoon.",
      "The gardener says he never entered the house.",
      "The sister says the hostess was nervous all evening.",
    ],
    answer: "The necklace was never stolen. The hostess hid it herself.",
    explanation:
      "There are no signs of forced entry, nothing else is missing, and the hostess had access and a motive to create drama or hide a financial problem. The clues point away from an outside thief and back to the person controlling the story.",
    difficulty: "easy",
    active: true,
  },
  {
    id: "m250-002",
    slug: "midnight-visitor",
    title: "The Midnight Visitor",
    setup:
      "A man claims he heard footsteps outside his room at midnight. In the morning, he is found unconscious, and the drawer where he kept a document is empty. The servant says no one entered the house during the night, and the front door was bolted from inside.",
    clues: [
      "It rained heavily that night.",
      "There were no muddy footprints in the hallway.",
      "The window of the man's room was slightly open.",
      "The missing document was useless to strangers but important to his business partner.",
    ],
    answer: "The business partner was already inside the house before nightfall.",
    explanation:
      "The lack of muddy footprints suggests the thief did not come in from outside during the rain. The business partner had reason to want the document and could have hidden in the house or remained there unnoticed until midnight.",
    difficulty: "medium",
    active: true,
  },
  {
    id: "m250-003",
    slug: "silent-clock",
    title: "The Silent Clock",
    setup:
      "A wealthy collector is found dead in his study. The grandfather clock in the room stopped at 8:15. His nephew says he visited at exactly 8:30 and found the door locked. The housekeeper says dinner was served at 7:45 and the collector was alive then.",
    clues: [
      "The clock was old but normally reliable.",
      "The study window was locked from inside.",
      "A broken glass lay near the desk.",
      "The nephew stood to inherit a large sum.",
    ],
    answer: "The stopped clock was staged to mislead the time of death.",
    explanation:
      "A stopped clock is too convenient as evidence. The killer likely tampered with it after the death to create a false timeline. That makes the apparent time of 8:15 suspicious rather than trustworthy.",
    difficulty: "medium",
    active: true,
  },
];
