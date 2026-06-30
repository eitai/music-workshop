import { site } from "../config";
import styles from "./Logo.module.css";

/** לוגו "שי בקצב": תג עגול עם תוף + שם המותג. */
export default function Logo({
  withText = true,
  size = 54,
}: {
  withText?: boolean;
  size?: number;
}) {
  return (
    <span className={styles.logo}>
      <svg
        className={styles.badge}
        viewBox="0 0 64 64"
        width={size}
        height={size}
        role="img"
        aria-label={site.brand}
      >
        <circle cx="32" cy="32" r="30" fill="#fff" stroke="#ef8022" strokeWidth="3" />
        {/* גוף התוף */}
        <path
          d="M23.5 28h17l-2.4 16.4a2.6 2.6 0 0 1-2.6 2.2h-7.4a2.6 2.6 0 0 1-2.6-2.2L23.5 28Z"
          fill="#ef8022"
        />
        {/* עור התוף */}
        <ellipse cx="32" cy="28" rx="9.2" ry="3.5" fill="#1ea7a2" />
        <ellipse cx="32" cy="28" rx="9.2" ry="3.5" fill="none" stroke="#18908b" strokeWidth="1" />
        {/* פעימות */}
        <circle cx="19" cy="18" r="2.6" fill="#1ea7a2" />
        <circle cx="45" cy="20" r="1.9" fill="#ef8022" />
        <circle cx="48" cy="40" r="1.6" fill="#1ea7a2" />
      </svg>

      {withText && (
        <span className={styles.word}>
          <strong className={styles.brand}>{site.brand}</strong>
          <small className={styles.sub}>{site.tagline}</small>
        </span>
      )}
    </span>
  );
}
