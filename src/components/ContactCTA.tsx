import { useState } from "react";
import { eventTypes, site } from "../config";
import styles from "./ContactCTA.module.css";

const waBase = `https://wa.me/${site.whatsapp}`;

/** בונה הודעת וואטסאפ מוכנה מפרטי הטופס. */
function buildMessage(d: {
  name: string;
  phone: string;
  eventType: string;
  date: string;
}): string {
  const lines = [
    `שלום ${site.teacher}! 👋`,
    "אשמח לקבל פרטים על סדנת מוזיקה לילדים.",
    "",
    `שם: ${d.name}`,
    `טלפון: ${d.phone}`,
    d.eventType ? `סוג אירוע: ${d.eventType}` : "",
    d.date ? `תאריך משוער: ${d.date}` : "",
  ].filter(Boolean);
  return lines.join("\n");
}

export default function ContactCTA() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    eventType: "",
    date: "",
  });
  const [sent, setSent] = useState(false);

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(buildMessage(form));
    const url = `${waBase}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  // קישור mailto כ-fallback אם אין וואטסאפ.
  const mailtoHref = () => {
    const subject = encodeURIComponent("הזמנת סדנת מוזיקה לילדים");
    const body = encodeURIComponent(buildMessage(form));
    return `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className={`section ${styles.contact}`} id="contact">
      <div className="container">
        <div className={styles.card}>
          {/* פאנל פנייה ישירה */}
          <aside className={styles.side}>
            <span className="eyebrow">בואו נדבר</span>
            <h2 className={styles.sideTitle}>
              מזמינים סדנה?
              <br />
              נשמח לתפור לכם חוויה.
            </h2>
            <p className={styles.sideText}>
              משאירים פרטים ואחזור אליכם עם כל המידע — מחיר, אורך הסדנה והתאמה
              לקבוצה. הכי מהיר? פשוט בוואטסאפ.
            </p>

            <a
              className={`btn btn--lg btn--whatsapp ${styles.waBtn}`}
              href={waBase}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                <path d="M.05 24l1.7-6.2A11.9 11.9 0 1 1 12 24a11.9 11.9 0 0 1-5.7-1.46L.05 24Zm6.6-3.9.37.22a9.86 9.86 0 0 0 5 1.37 9.9 9.9 0 1 0-9.9-9.9c0 1.8.48 3.5 1.4 5l.24.38-1 3.66 3.9-1.03Zm11.4-5.5c-.15-.25-.55-.4-1.15-.7-.6-.3-3.5-1.73-4.04-1.93-.54-.2-.94-.3-1.33.3-.4.6-1.53 1.92-1.88 2.32-.35.4-.7.45-1.3.15-.6-.3-2.5-.92-4.77-2.94-1.76-1.57-2.95-3.5-3.3-4.1-.34-.6-.04-.92.26-1.22.27-.27.6-.7.9-1.05.3-.35.4-.6.6-1 .2-.4.1-.75-.05-1.05-.15-.3-1.33-3.2-1.82-4.38-.48-1.15-.97-1-1.33-1.02l-1.13-.02c-.4 0-1.05.15-1.6.75-.55.6-2.1 2.05-2.1 5s2.15 5.8 2.45 6.2c.3.4 4.23 6.45 10.24 9.05 1.43.62 2.55.99 3.42 1.27 1.44.46 2.75.4 3.78.24 1.15-.17 3.5-1.43 4-2.82.5-1.38.5-2.56.35-2.8Z" />
              </svg>
              לשיחה מהירה בוואטסאפ
            </a>

            <a className={styles.phoneRow} href={`tel:${site.phoneHref}`}>
              <span className={styles.phoneIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                  <path
                    d="M5 4h3l1.5 4.5L7.5 10a11 11 0 0 0 6 6l1.5-2 4.5 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>
                <span className={styles.phoneLabel}>מעדיפים להתקשר?</span>
                <span className={styles.phoneNum} dir="ltr">
                  {site.phoneDisplay}
                </span>
              </span>
            </a>
          </aside>

          {/* טופס הלידים */}
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="cf-name">שם מלא</label>
              <input
                id="cf-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="איך קוראים לך?"
                value={form.name}
                onChange={update("name")}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="cf-phone">טלפון</label>
              <input
                id="cf-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                placeholder="050-0000000"
                value={form.phone}
                onChange={update("phone")}
                dir="ltr"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="cf-type">סוג האירוע</label>
              <select
                id="cf-type"
                name="eventType"
                value={form.eventType}
                onChange={update("eventType")}
              >
                <option value="" disabled>
                  בחרו סוג אירוע
                </option>
                {eventTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="cf-date">תאריך משוער</label>
              <input
                id="cf-date"
                name="date"
                type="text"
                placeholder="למשל: סוף יוני / 12.7 / גמיש"
                value={form.date}
                onChange={update("date")}
              />
            </div>

            <button
              type="submit"
              className={`btn btn--lg ${styles.submit}`}
              disabled={!form.name.trim() || !form.phone.trim()}
            >
              שליחה בוואטסאפ
            </button>

            <p className={styles.formNote} aria-live="polite">
              {sent ? (
                <>
                  פתחנו עבורכם וואטסאפ עם ההודעה מוכנה ✅ אם לא נפתח,{" "}
                  <a href={mailtoHref()} className={styles.mailLink}>
                    שלחו לי במייל
                  </a>
                  .
                </>
              ) : (
                <>בלחיצה ייפתח וואטסאפ עם הודעה מוכנה — רק ללחוץ שליחה. בלי ספאם, מבטיח.</>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
