import type { MysteryPuzzle } from "./types";

export const mysteryPuzzlesFr: MysteryPuzzle[] = [
  {
    id: "m250-006",
    slug: "les-empreintes-a-sens-unique",
    title: "Les empreintes à sens unique",
    setup:
      "Après une nuit de neige fraîche, un fermier aperçoit une seule piste d’empreintes allant de la route jusqu’à sa grange fermée à clé. Il n’y a aucune trace de retour. Il se précipite vers la grange, l’ouvre, et ne trouve personne à l’intérieur.",
    question: "Comment est-ce possible ?",
    answer:
      "La piste semblait seulement mener vers la grange. La personne avait marché à reculons depuis la grange vers la route.",
    explanation:
      "Comme les empreintes étaient orientées vers la grange, le fermier a supposé que quelqu’un y était entré. En réalité, la personne quittait la grange en marchant à reculons, ce qui donnait l’impression que la piste allait vers la porte.",
    difficulty: "medium",
    imageUrl: "/images/mystery250/the-one-way-footprints.png",
    imageAlt:
      "Une cour de ferme enneigée avec une grange fermée, une seule piste d’empreintes et un fermier perplexe.",
    active: true,
  },
  {
    id: "m250-001",
    slug: "collier-disparu",
    title: "Le collier disparu",
    setup:
      "Lors d’un dîner familial, un collier de grande valeur disparaît dans la chambre de l’hôtesse. La pièce était fermée à clé lorsque les invités sont arrivés. Quatre personnes seulement étaient entrées dans la maison avant la découverte du vol : la domestique, le jardinier, l’hôtesse et sa sœur. Aucune fenêtre n’était brisée et rien d’autre n’avait disparu.",
    clues: [
      "L’hôtesse portait le collier plus tôt dans la soirée.",
      "La domestique affirme avoir nettoyé la chambre dans l’après-midi.",
      "Le jardinier affirme n’être jamais entré dans la maison.",
      "La sœur dit que l’hôtesse était nerveuse toute la soirée.",
    ],
    answer: "Le collier n’a jamais été volé. L’hôtesse l’a caché elle-même.",
    explanation:
      "Il n’y a aucune trace d’effraction, rien d’autre n’a disparu, et l’hôtesse avait l’accès ainsi qu’un possible motif pour créer un drame ou cacher un problème financier. Les indices éloignent l’idée d’un voleur extérieur.",
    difficulty: "easy",
    active: true,
  },
  {
    id: "m250-002",
    slug: "visiteur-de-minuit",
    title: "Le visiteur de minuit",
    setup:
      "Un homme affirme avoir entendu des pas devant sa chambre à minuit. Le matin, on le retrouve inconscient et le tiroir où il gardait un document est vide. Le domestique affirme que personne n’est entré dans la maison pendant la nuit, et la porte d’entrée était verrouillée de l’intérieur.",
    clues: [
      "Il a plu fortement cette nuit-là.",
      "Aucune trace de boue n’a été retrouvée dans le couloir.",
      "La fenêtre de la chambre était légèrement entrouverte.",
      "Le document disparu était sans valeur pour un inconnu, mais important pour son associé.",
    ],
    answer: "L’associé se trouvait déjà dans la maison avant la tombée de la nuit.",
    explanation:
      "L’absence de traces de boue suggère que le voleur n’est pas entré de l’extérieur pendant la pluie. L’associé avait une raison de vouloir le document et pouvait déjà se trouver dans la maison.",
    difficulty: "medium",
    active: true,
  },
  {
    id: "m250-003",
    slug: "horloge-silencieuse",
    title: "L’horloge silencieuse",
    setup:
      "Un riche collectionneur est retrouvé mort dans son bureau. L’horloge de parquet s’est arrêtée à 8 h 15. Son neveu affirme être passé à exactement 8 h 30 et avoir trouvé la porte fermée. La gouvernante dit que le dîner a été servi à 7 h 45 et que le collectionneur était alors vivant.",
    clues: [
      "L’horloge était ancienne mais habituellement fiable.",
      "La fenêtre du bureau était verrouillée de l’intérieur.",
      "Un verre brisé se trouvait près du bureau.",
      "Le neveu devait hériter d’une grosse somme.",
    ],
    answer: "L’horloge arrêtée a été manipulée pour tromper sur l’heure de la mort.",
    explanation:
      "Une horloge arrêtée constitue un indice trop commode. Le meurtrier l’a probablement dérangée après le décès pour fabriquer une fausse chronologie.",
    difficulty: "medium",
    active: true,
  },
];
