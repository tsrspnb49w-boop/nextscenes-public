import Link from "next/link";

type MediaItem = {
  title: string;
  href: string;
  label?: string;
  description?: string;
  img?: string; // later: /public/images/...
};

export default function MediaGrid({ items }: { items: MediaItem[] }) {
  return (
    <div className="ns-media-grid">
      {items.map((it) => (
        <Link key={it.href} href={it.href} className="ns-media-card">
          <div className="ns-media-thumb" aria-hidden="true">
            {it.img ? (
              // Using plain div background for now (no Next/Image yet)
              <div
                className="ns-media-thumb-img"
                style={{ backgroundImage: `url(${it.img})` }}
              />
            ) : (
              <div className="ns-media-thumb-placeholder">
                <span>NS</span>
              </div>
            )}
          </div>

          <div className="ns-media-body">
            <div className="ns-media-title">{it.title}</div>
            {it.description ? (
              <div className="ns-media-desc">{it.description}</div>
            ) : null}
            {it.label ? <div className="ns-media-tag">{it.label}</div> : null}
          </div>
        </Link>
      ))}
    </div>
  );
}
