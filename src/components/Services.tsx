import { asset } from "../lib/asset";
import styles from "./Services.module.css";

/**
 * "מה אנחנו מציעים" — סוגי הסדנאות והשירותים, ותת-סקשן "אירועים פרטיים".
 * התמונות חולצו מהוידאו; ניתן להחליף בקלות בתמונות אמיתיות מכל תחום.
 */

type Card = { title: string; text: string; img: string; alt: string };

const OFFERINGS: Card[] = [
  {
    title: "סדנאות לילדים ונוער",
    text: "מגיל גן חובה ועד תיכון — מעגלי תיפוף חווייתיים ומותאמי גיל.",
    img: "/newphotos/g02.webp",
    alt: "שי פריזנר מעביר סדנת קצב לקהל",
  },
  {
    title: "תיפוף גוף",
    text: "קצב חופשי עם הגוף — מחיאות, רקיעות וצלילים, בלי כלים בכלל.",
    img: "/newphotos/g06.webp",
    alt: "שי פריזנר מתופף בסדנה",
  },
  {
    title: "הפעלות לילדים",
    text: "הפעלות קצב שמחות וסוחפות לגנים, לימי הולדת ולאירועי משפחה.",
    img: "/newphotos/g07.webp",
    alt: "רגע מתוך הפעלה מוזיקלית עם שי",
  },
  {
    title: "ימי גיבוש",
    text: "חוויית תופים משותפת לצוותים וארגונים — תקשורת, הקשבה והרבה כיף.",
    img: "/newphotos/g09.webp",
    alt: "שי פריזנר מול קבוצה ביום גיבוש",
  },
];

const FEATURE_RIGHT: Card = {
  title: "מופע מוזיקלי",
  text: "מופע הקשה סוחף וריתמי — לכל גיל ולכל במה.",
  img: "/newphotos/g01.webp",
  alt: "שי פריזנר מנגן בהאנג במופע",
};

const FEATURE_LEFT: Card = {
  title: "סאונד הילינג & וולנס",
  text: "מעגלי צלילים לרגיעה, איזון ונשימה — חוויה מרפאת למבוגרים.",
  img: "/newphotos/g05.webp",
  alt: "שי פריזנר במעגל סאונד הילינג עם האנג",
};

const EVENTS: { label: string; img: string; alt: string }[] = [
  { label: "חתונות", img: "/newphotos/g03.webp", alt: "שי פריזנר מנגן באירוע" },
  { label: "בר / בת מצווה", img: "/newphotos/g04.webp", alt: "שי פריזנר במופע לאירוע" },
  { label: "אירועי חברה", img: "/newphotos/g08.webp", alt: "שי פריזנר מופיע באירוע חברה" },
  { label: "עליית לתורה", img: "/newphotos/g10.webp", alt: "שי פריזנר מנגן באירוע משפחתי" },
];

function OfferingCard({ c }: { c: Card }) {
  return (
    <article className={styles.card}>
      <div className={styles.thumb}>
        <img src={asset(c.img)} alt={c.alt} loading="lazy" decoding="async" width={760} height={570} />
      </div>
      <h3 className={styles.cardTitle}>{c.title}</h3>
      <p className={styles.cardText}>{c.text}</p>
    </article>
  );
}

function FeatureCard({ c }: { c: Card }) {
  return (
    <article className={styles.feature}>
      <div className={styles.featureThumb}>
        <img src={asset(c.img)} alt={c.alt} loading="lazy" decoding="async" width={760} height={570} />
      </div>
      <div className={styles.featureBody}>
        <h3 className={styles.cardTitle}>{c.title}</h3>
        <p className={styles.cardText}>{c.text}</p>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section className={`section ${styles.services}`} id="services">
      <div className="container">
        <div className={`section-head ${styles.head}`}>
          <span className="eyebrow">השירותים שלנו</span>
          <h2 className="section-title">מה אנחנו מציעים</h2>
          <p className="section-lead">
            מתופים קטנים בגן ועד מעגלי צלילים למבוגרים — לכל קהל יש את הקצב שלו.
          </p>
        </div>

        <div className={styles.grid}>
          {OFFERINGS.map((c) => (
            <OfferingCard key={c.title} c={c} />
          ))}
        </div>

        {/* אירועים פרטיים */}
        <h3 id="events" className={styles.subHead}>
          אירועים פרטיים
        </h3>
        <div className={styles.eventsRow}>
          <FeatureCard c={FEATURE_RIGHT} />

          <ul className={styles.eventGrid}>
            {EVENTS.map((e) => (
              <li key={e.label} className={styles.event}>
                <div className={styles.eventThumb}>
                  <img
                    src={asset(e.img)}
                    alt={e.alt}
                    loading="lazy"
                    decoding="async"
                    width={760}
                    height={760}
                  />
                </div>
                <span className={styles.eventLabel}>{e.label}</span>
              </li>
            ))}
          </ul>

          <FeatureCard c={FEATURE_LEFT} />
        </div>
      </div>
    </section>
  );
}
