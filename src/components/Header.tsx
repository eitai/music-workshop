import { useEffect, useState } from "react";
import { nav, site } from "../config";
import Logo from "./Logo";
import styles from "./Header.module.css";

/**
 * סרגל עליון: לוגו + ניווט + כפתור "צרו קשר".
 * מופיע אחרי שגוללים מעבר ל-Hero (הוידאו), כדי לא להפריע לרצף בראש העמוד.
 * בנוסף — כפתור וואטסאפ צף.
 */
export default function Header() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight * 0.7);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`${styles.bar} ${visible ? styles.barShown : ""}`}>
        <div className={`container ${styles.barInner}`}>
          <a href="#hero" className={styles.logoLink} aria-label={`${site.brand} — לראש העמוד`}>
            <Logo />
          </a>

          <nav className={styles.nav} aria-label="ניווט ראשי">
            {nav.map((l) => (
              <a key={l.href} href={l.href} className={styles.navLink}>
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className={`btn ${styles.cta}`}>
            צרו קשר
          </a>
        </div>
      </header>

      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.fab} ${visible ? styles.fabShown : ""}`}
        aria-label="שיחה מהירה בוואטסאפ"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
          <path d="M.05 24l1.7-6.2A11.9 11.9 0 1 1 12 24a11.9 11.9 0 0 1-5.7-1.46L.05 24Zm6.6-3.9.37.22a9.86 9.86 0 0 0 5 1.37 9.9 9.9 0 1 0-9.9-9.9c0 1.8.48 3.5 1.4 5l.24.38-1 3.66 3.9-1.03Zm11.4-5.5c-.15-.25-.55-.4-1.15-.7-.6-.3-3.5-1.73-4.04-1.93-.54-.2-.94-.3-1.33.3-.4.6-1.53 1.92-1.88 2.32-.35.4-.7.45-1.3.15-.6-.3-2.5-.92-4.77-2.94-1.76-1.57-2.95-3.5-3.3-4.1-.34-.6-.04-.92.26-1.22.27-.27.6-.7.9-1.05.3-.35.4-.6.6-1 .2-.4.1-.75-.05-1.05-.15-.3-1.33-3.2-1.82-4.38-.48-1.15-.97-1-1.33-1.02l-1.13-.02c-.4 0-1.05.15-1.6.75-.55.6-2.1 2.05-2.1 5s2.15 5.8 2.45 6.2c.3.4 4.23 6.45 10.24 9.05 1.43.62 2.55.99 3.42 1.27 1.44.46 2.75.4 3.78.24 1.15-.17 3.5-1.43 4-2.82.5-1.38.5-2.56.35-2.8Z" />
        </svg>
      </a>
    </>
  );
}
