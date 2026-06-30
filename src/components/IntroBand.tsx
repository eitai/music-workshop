import { site } from "../config";
import BeatField from "./BeatField";
import styles from "./IntroBand.module.css";

/**
 * רצועת פתיחה מותגית (אחרי וידאו ה-Hero) — הכותרת הראשית של "שי בקצב",
 * תמונה, וקריאה לפעולה. מבוסס על ה-hero שבעיצוב הייחוס.
 */
export default function IntroBand() {
  return (
    <section className={`section ${styles.intro}`} id="intro">
      <BeatField />
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.text}>
            <span className="eyebrow">תופים · סאונד הילינג · אירועים</span>
            <h2 className={styles.title}>
              {site.brand}: חוויה מוזיקלית
              <br />
              וריפוי בסאונד עם <span className={styles.name}>{site.teacher}</span>
            </h2>
            <p className={styles.lead}>
              בואו להכיר את הקסם של מעגלי תיפוף וצלילים — חוויה חמה ואנרגטית
              שמרגשת ילדים ומבוגרים כאחד, בגנים, בבתי ספר ובאירועים פרטיים.
            </p>
            <div className={styles.actions}>
              <a className="btn btn--lg" href="#contact">
                צרו קשר לתיאום סדנה
              </a>
              <a className="btn btn--lg btn--ghost" href="#services">
                מה אנחנו מציעים
              </a>
            </div>
          </div>

          <div className={styles.media}>
            <span className={styles.blob} aria-hidden="true" />
            <img
              className={styles.photo}
              src="/photos/p06.webp"
              alt="שי פריזנר מנגן בתוף במעגל של ילדים בסדנת מוזיקה"
              loading="lazy"
              decoding="async"
              width={800}
              height={450}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
