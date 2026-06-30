import { asset } from "../lib/asset";
import styles from "./Gallery.module.css";

/**
 * גלריה — תמונות אמיתיות מהסדנאות (public/newphotos/).
 * להחלפה/הוספה: שמרו קובץ ב-public/newphotos והוסיפו ל-PHOTOS.
 */
const PHOTOS = [
  { src: "/newphotos/g01.webp", alt: "שי מנגן בהאנג (handpan) מול קהל בסדנת סאונד" },
  { src: "/newphotos/g02.webp", alt: "רגע מתוך מעגל הקשבה וצלילים" },
  { src: "/newphotos/g03.webp", alt: "משתתפים נהנים מחוויה מוזיקלית" },
  { src: "/newphotos/g04.webp", alt: "שי מעביר סדנת תיפוף וצלילים" },
  { src: "/newphotos/g05.webp", alt: "מעגל מוזיקלי משותף בסדנה" },
  { src: "/newphotos/g06.webp", alt: "נגינה והקשבה במהלך הסדנה" },
  { src: "/newphotos/g07.webp", alt: "רגע של חיבור וקצב משותף" },
  { src: "/newphotos/g08.webp", alt: "חוויה מוזיקלית לקהל בכל הגילאים" },
  { src: "/newphotos/g09.webp", alt: "שי וכלי הנגינה בסדנה" },
  { src: "/newphotos/g10.webp", alt: "אווירה של שמחה וצלילים בסדנה" },
];

export default function Gallery() {
  return (
    <section className={`section ${styles.gallery}`} id="gallery">
      <div className="container">
        <div className={`section-head ${styles.head}`}>
          <span className="eyebrow">רגעים מהסדנה</span>
          <h2 className="section-title">גלריה</h2>
          <p className="section-lead">
            הצצה לאנרגיה, לחיוכים ולקסם שקורה כשמתחילים לנגן יחד.
          </p>
        </div>

        <div className={styles.grid}>
          {PHOTOS.map((p) => (
            <figure key={p.src} className={styles.item}>
              <img
                src={asset(p.src)}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                width={1400}
                height={1866}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
