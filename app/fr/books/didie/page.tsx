import DidieBookPage from "@/components/DidieBookPage";
import { buildMetadata } from "@/app/seo";

export const metadata = buildMetadata({
  title: "The Story of Didie de Goddy Oguzie | Présentation en français | NextScenes",
  description: "Découvrez en français The Story of Didie, roman historique de Goddy Oguzie sur l’amour, la tradition, l’injustice et le destin. Livre disponible en anglais uniquement.",
  path: "/fr/books/didie",
  locale: "fr",
  image: "/images/books/didie/approved-front.webp",
  languages: { en: "/books/didie", fr: "/fr/books/didie" },
});

export default function DidieFrenchPage() {
  return <DidieBookPage language="fr" />;
}
