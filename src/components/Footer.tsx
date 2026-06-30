import { nav, site } from "../config";
import Logo from "./Logo";
import styles from "./Footer.module.css";

const waHref = `https://wa.me/${site.whatsapp}`;

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { key: "wa", href: waHref, label: "וואטסאפ", path: "M.05 24l1.7-6.2A11.9 11.9 0 1 1 12 24a11.9 11.9 0 0 1-5.7-1.46L.05 24Zm6.6-3.9.37.22a9.86 9.86 0 0 0 5 1.37 9.9 9.9 0 1 0-9.9-9.9c0 1.8.48 3.5 1.4 5l.24.38-1 3.66 3.9-1.03Zm11.4-5.5c-.15-.25-.55-.4-1.15-.7-.6-.3-3.5-1.73-4.04-1.93-.54-.2-.94-.3-1.33.3-.4.6-1.53 1.92-1.88 2.32-.35.4-.7.45-1.3.15-.6-.3-2.5-.92-4.77-2.94-1.76-1.57-2.95-3.5-3.3-4.1-.34-.6-.04-.92.26-1.22.27-.27.6-.7.9-1.05.3-.35.4-.6.6-1 .2-.4.1-.75-.05-1.05-.15-.3-1.33-3.2-1.82-4.38-.48-1.15-.97-1-1.33-1.02l-1.13-.02c-.4 0-1.05.15-1.6.75-.55.6-2.1 2.05-2.1 5s2.15 5.8 2.45 6.2c.3.4 4.23 6.45 10.24 9.05 1.43.62 2.55.99 3.42 1.27 1.44.46 2.75.4 3.78.24 1.15-.17 3.5-1.43 4-2.82.5-1.38.5-2.56.35-2.8Z" },
    site.social.facebook && { key: "fb", href: site.social.facebook, label: "פייסבוק", path: "M13.5 21v-7h2.4l.4-3h-2.8V9c0-.9.3-1.5 1.6-1.5H17V4.8c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9V11H8.5v3H11v7h2.5Z" },
    site.social.instagram && { key: "ig", href: site.social.instagram, label: "אינסטגרם", path: null },
    site.social.youtube && { key: "yt", href: site.social.youtube, label: "יוטיוב", path: "M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.5A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12ZM9.8 15.3V8.7l6 3.3-6 3.3Z" },
  ].filter(Boolean) as { key: string; href: string; label: string; path: string | null }[];

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          {/* מותג */}
          <div className={styles.brandCol}>
            <div className={styles.brandRow}>
              <Logo withText={false} size={50} />
              <span className={styles.brandText}>
                <strong>{site.brand}</strong>
                <small>{site.teacher}</small>
              </span>
            </div>
            <p className={styles.tagline}>
              סדנאות תיפוף, מעגלי קצב, סאונד הילינג והפעלות מוזיקליות — לילדים,
              למבוגרים ולאירועים.
            </p>
            <div className={styles.social}>
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={styles.socialBtn}
                >
                  {s.path ? (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* ניווט */}
          <nav className={styles.col} aria-label="ניווט תחתון">
            <h4 className={styles.colTitle}>ניווט</h4>
            {nav.map((l) => (
              <a key={l.href} href={l.href} className={styles.link}>
                {l.label}
              </a>
            ))}
            <a href="#contact" className={styles.link}>
              צרו קשר
            </a>
          </nav>

          {/* יצירת קשר */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>צרו קשר</h4>
            <a href={`tel:${site.phoneHref}`} className={styles.link} dir="ltr">
              {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className={styles.link} dir="ltr">
              {site.email}
            </a>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className={styles.link}>
              וואטסאפ
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {site.brand} · {site.teacher}. כל הזכויות שמורות.
          </p>
          <p className={styles.credit}>נבנה באהבה ובקצב 🥁</p>
        </div>
      </div>
    </footer>
  );
}
