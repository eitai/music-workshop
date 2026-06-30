import { site } from "../config";
import { asset } from "../lib/asset";
import styles from "./About.module.css";

const TAGS = ["תופי ג'מבה", "תיפוף גוף", "סאונד הילינג", "מעגלי קצב", "אירועים"];

export default function About() {
  return (
    <section className={`section ${styles.about}`} id="about">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.text}>
            <span className="eyebrow">הכירו את שי</span>
            <h2 className="section-title">קצב, צליל ולב פתוח</h2>
            <p className={styles.p}>
              {/* TODO: שי — החלף בטקסט אישי אמיתי */}
              {site.teacher} הוא מוזיקאי, מתופף ומנחה סדנאות הקשה שמביא איתו
              אנרגיה מדבקת לכל מפגש. כבר שנים שהוא מעביר סדנאות תיפוף, מעגלי קצב
              וסאונד הילינג — בגנים, בבתי ספר, באירועי חברה ובאירועים פרטיים.
            </p>
            <p className={styles.p}>
              הגישה שלו פשוטה: לכל אחד יש קצב, וכשנותנים לו מקום נוצרים חיבור,
              שמחה וריפוי. הסדנאות משלבות תופי ג'מבה, כלי הקשה מכל העולם, תיפוף
              גוף, תנועה והקשבה — ומותאמות לגיל ולאופי של כל קבוצה.
            </p>

            <ul className={styles.tags}>
              {TAGS.map((t) => (
                <li key={t} className={styles.tag}>
                  {t}
                </li>
              ))}
            </ul>
            <p className={styles.note}>* טקסט לדוגמה — קל להחלפה בסיפור האישי שלך.</p>
          </div>

          <div className={styles.portrait}>
            <span className={styles.ring} aria-hidden="true" />
            <img
              className={styles.photo}
              src={asset("/photos/portrait.webp")}
              alt={`${site.teacher} — מנחה סדנאות התיפוף`}
              loading="lazy"
              decoding="async"
              width={560}
              height={560}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
