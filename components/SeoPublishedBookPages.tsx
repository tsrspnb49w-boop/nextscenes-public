import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/app/seo";
import {
  publicChildrensBooks,
  type PublicBook,
  type PublicBookLocale,
} from "@/app/lib/seoPublishedBooks";

export function SeoPublishedBooksIndex({ locale }: { locale: PublicBookLocale }) {
  const fr = locale === "fr";
  const didieHref = fr ? "/fr/books/didie" : "/books/didie";
  const books = publicChildrensBooks[locale];
  return (
    <div className="ns-page ns-compact" lang={locale}>
      <h1 className="ns-h1">{fr ? "Livres publiés" : "Published books"}</h1>
      <p className="ns-p">
        {fr
          ? "Découvrez les livres de Goddy Oguzie, dont trois histoires pour enfants autour de la bonté, du courage et de l’amitié. Chaque édition est présentée dans sa langue."
          : "Explore books by Goddy Oguzie, including three children's stories about friendship, courage and kindness. Each edition is clearly identified."}
      </p>
      <div className="ns-grid-3">
        <article className="ns-card">
          <Link href={didieHref} aria-label={fr ? "Découvrir The Story of Didie" : "Discover The Story of Didie"}>
            <Image src="/images/books/didie/approved-front.webp" alt="The Story of Didie book cover" width={180} height={270} sizes="180px" style={{ width: 145, height: 218, objectFit: "cover" }} />
          </Link>
          <h2 className="ns-h3">The Story of Didie</h2>
          <p className="ns-p">{fr
            ? "Roman historique sur l’amour, la tradition et la justice dans le Nigeria du début du XXe siècle. Édition publiée en anglais uniquement."
            : "An English-language historical novel about love, tradition and justice in early twentieth-century Nigeria."}</p>
          <p className="ns-p">{fr ? "Auteur : Goddy Oguzie · Langue : anglais" : "Author: Goddy Oguzie · Language: English"}</p>
          <Link href={didieHref}>{fr ? "Découvrir le livre" : "Discover the book"}</Link>
        </article>
        {books.map((book) => (
          <article key={book.id} className="ns-card">
            <Link href={book.href} aria-label={(fr ? "Découvrir " : "Discover ") + book.title}>
              <Image src={book.cover} alt={book.title + " book cover"} width={180} height={250} sizes="180px" style={{ width: 145, height: 202, objectFit: "cover" }} />
            </Link>
            <h2 className="ns-h3">{book.title}</h2>
            <p className="ns-p">{book.summary}</p>
            <p className="ns-p">{fr ? "Auteur : " : "Author: "}{book.author} · {fr ? "Langue : français" : "Language: English"}</p>
            <Link href={book.href}>{fr ? "Découvrir le livre" : "Discover the book"}</Link>
          </article>
        ))}
      </div>
      <p className="ns-p">
        {fr ? "Vous écrivez également ? " : "Writing a book of your own? "}
        <Link href={fr ? "/fr/auteurs" : "/writers"}>
          {fr ? "Découvrez l’espace d’écriture NextScenes." : "Discover the NextScenes writing workspace."}
        </Link>
      </p>
    </div>
  );
}

export function SeoPublishedBookProfile({ book }: { book: PublicBook }) {
  const fr = book.language === "fr";
  const bookData = {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": absoluteUrl(book.href + "#book"),
    name: book.title,
    url: absoluteUrl(book.href),
    author: { "@type": "Person", name: book.author },
    image: absoluteUrl(book.cover),
    description: book.summary,
    inLanguage: book.language,
  };
  return (
    <div className="ns-page ns-compact" lang={book.language}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookData).replace(/</g, "\\u003c") }}
      />
      <p className="ns-p"><Link href={fr ? "/fr/books" : "/books"}>{fr ? "Livres publiés" : "Published books"}</Link></p>
      <h1 className="ns-h1">{book.title}</h1>
      <div className="ns-grid-3">
        <div className="ns-card">
          <Image
            src={book.cover}
            alt={book.title + " cover"}
            width={300}
            height={420}
            sizes="(max-width: 640px) 75vw, 300px"
            priority
            style={{ width: "100%", height: "auto", maxWidth: 300, borderRadius: 7, margin: "0 auto" }}
          />
        </div>
        <div className="ns-card" style={{ gridColumn: "span 2" }}>
          <h2 className="ns-h2">{fr ? "À propos du livre" : "About the book"}</h2>
          <p className="ns-p">{book.summary}</p>
          <p className="ns-p">{fr ? "Auteur" : "Author"} : <strong>{book.author}</strong></p>
          <p className="ns-p">{fr ? "Langue du livre : français" : "Book language: English"}</p>
          <p className="ns-p">{fr ? "Thèmes" : "Themes"} : {book.themes}</p>
          <div className="ns-actions" style={{ justifyContent: "flex-start" }}>
            <a className="ns-btn ns-btn-primary" href={book.amazonSearchUrl} target="_blank" rel="noopener noreferrer">
              {fr ? "Rechercher ce livre sur Amazon" : "Find this book on Amazon"}
            </a>
          </div>
          <p className="ns-p" style={{ marginTop: 16 }}>
            <Link href={book.alternateHref}>{fr ? "Voir l’édition en anglais" : "View the French edition"}</Link>
          </p>
          <p className="ns-p">
            <Link href={fr ? "/fr/books" : "/books"}>{fr ? "Tous les livres publiés" : "Browse all published books"}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
