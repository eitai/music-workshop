import styles from "./BeatField.module.css";

/**
 * אלמנט החתימה: תווי מוזיקה צבעוניים (כתום/טורקיז) שמרחפים ברקע בקצב.
 * דקורטיבי בלבד — pointer-events: none, aria-hidden.
 */

type Note = {
  top: string;
  left: string;
  size: number;
  color: string;
  glyph: string;
  delay: string;
  duration: string;
};

// מיקומים קבועים (דטרמיניסטי) לקומפוזיציה נעימה.
const NOTES: Note[] = [
  { top: "14%", left: "7%", size: 30, color: "var(--orange)", glyph: "♪", delay: "0s", duration: "7s" },
  { top: "66%", left: "4%", size: 22, color: "var(--teal)", glyph: "♫", delay: "1.2s", duration: "9s" },
  { top: "24%", left: "90%", size: 34, color: "var(--teal)", glyph: "♩", delay: "0.6s", duration: "8s" },
  { top: "76%", left: "86%", size: 26, color: "var(--orange)", glyph: "♪", delay: "2s", duration: "10s" },
  { top: "44%", left: "95%", size: 20, color: "var(--orange)", glyph: "♫", delay: "0.3s", duration: "6.5s" },
  { top: "8%", left: "52%", size: 24, color: "var(--teal)", glyph: "♪", delay: "1.6s", duration: "8.5s" },
  { top: "88%", left: "42%", size: 28, color: "var(--orange)", glyph: "♩", delay: "0.9s", duration: "7.5s" },
  { top: "52%", left: "14%", size: 22, color: "var(--teal)", glyph: "♫", delay: "2.4s", duration: "9.5s" },
];

export default function BeatField({ className = "" }: { className?: string }) {
  return (
    <div className={`${styles.field} ${className}`} aria-hidden="true">
      {NOTES.map((n, i) => (
        <span
          key={i}
          className={styles.note}
          style={{
            top: n.top,
            left: n.left,
            fontSize: n.size,
            color: n.color,
            animationDelay: n.delay,
            animationDuration: n.duration,
          }}
        >
          {n.glyph}
        </span>
      ))}
    </div>
  );
}
