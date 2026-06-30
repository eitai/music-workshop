import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "../config";
import {
  FRAME_COUNT,
  POSTER_SRC,
  buildFramePaths,
  isMobileViewport,
} from "../lib/frames";
import { asset } from "../lib/asset";
import { usePreloadFrames } from "../hooks/usePreloadFrames";
import styles from "./HeroSequence.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * נקודת מיקוד לחיתוך ה"cover": איזה חלק מהפריים לשמור במרכז.
 * שי נמצא בערך ב-63% מרוחב הפריים, ולכן ממקדים שם כדי שהוא יהיה במרכז
 * גם במסכי נייד צרים (שחותכים את הצדדים). 0=שמאל, 1=ימין.
 */
const FOCUS_X = 0.63;
const FOCUS_Y = 0.45;

/** האם המשתמש ביקש פחות תנועה — נחושב פעם אחת. */
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function HeroSequence() {
  const wrapRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // מצב reduced-motion ובחירת נייד/דסקטופ — נקבעים פעם אחת בטעינה.
  const [reduced] = useState(prefersReducedMotion);
  const [mobile] = useState(isMobileViewport);

  // ב-reduced-motion לא טוענים 181 פריימים — רק פוסטר סטטי.
  const paths = useMemo(
    () => (reduced ? [] : buildFramePaths(mobile)),
    [reduced, mobile],
  );
  const { images, progress, ready, skip } = usePreloadFrames(paths);

  // נעילת גלילה עד שהפריימים מוכנים (לא חוסם ב-reduced-motion).
  useEffect(() => {
    if (reduced) return;
    document.body.style.overflow = ready ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready, reduced]);

  // הקמת ה-canvas + ScrollTrigger לאחר שהפריימים מוכנים.
  useEffect(() => {
    if (reduced || !ready) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const overlay = overlayRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = { frame: 0 };
    const lastFrame = FRAME_COUNT - 1;

    // ציור פריים בודד עם חישוב "cover" (כמו object-fit: cover) + ניקוי.
    const render = (frameFloat: number) => {
      const idx = Math.max(0, Math.min(lastFrame, Math.round(frameFloat)));
      const img = images.current[idx];
      // פריים עדיין לא נטען? משאירים את הפריים הקודם שצויר — לא מנקים למסך ריק/כחול.
      if (!img || !img.width || !img.height) return;
      const cw = canvas.width;
      const ch = canvas.height;

      const ir = img.width / img.height;
      const cr = cw / ch;
      let w = cw;
      let h = ch;
      let x = 0;
      let y = 0;
      if (ir > cr) {
        // ממלא לגובה, חותך בצדדים — ממקד אופקית על שי, עם clamp לקצוות
        h = ch;
        w = ch * ir;
        x = Math.min(0, Math.max(cw - w, cw / 2 - FOCUS_X * w));
      } else {
        // ממלא לרוחב, חותך למעלה/למטה — ממקד אנכית, עם clamp לקצוות
        w = cw;
        h = cw / ir;
        y = Math.min(0, Math.max(ch - h, ch / 2 - FOCUS_Y * h));
      }
      ctx.drawImage(img, x, y, w, h);
    };

    // עדכון שקיפות הכיתוב לפי התקדמות הרצף (אפקט "חשיפה" בסגנון Apple).
    const updateOverlay = () => {
      if (!overlay) return;
      const p = state.frame / lastFrame; // 0→1
      // נשאר מלא עד 12%, נמוג עד 45%.
      const o = p <= 0.12 ? 1 : Math.max(0, 1 - (p - 0.12) / 0.33);
      overlay.style.opacity = String(o);
      overlay.style.transform = `translateY(${(1 - o) * -24}px)`;
      overlay.style.pointerEvents = o < 0.15 ? "none" : "";
    };

    // התאמת גודל ה-canvas ל-DPR + ציור מחדש.
    // מקובץ ב-rAF, מדלג כשהגודל לא השתנה, וקורא את ה-DPR מחדש בכל פעם
    // (כדי לתמוך בזום / מעבר מסך עם DPR שונה).
    let lastW = 0;
    let lastH = 0;
    let resizeRaf = 0;
    const applyResize = () => {
      resizeRaf = 0;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (w === lastW && h === lastH) return; // אין שינוי — לא מקצים backing store מחדש
      lastW = w;
      lastH = h;
      canvas.width = w;
      canvas.height = h;
      render(state.frame);
    };
    const onResize = () => {
      if (resizeRaf) return; // כבר מתוזמן ל-frame הבא
      resizeRaf = window.requestAnimationFrame(applyResize);
    };

    applyResize();
    window.addEventListener("resize", onResize);

    const tween = gsap.to(state, {
      frame: lastFrame,
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        // אורך הגלילה לפי מספר הפריימים — ~44px לכל פריים.
        // כך מהירות ה-scrub קבועה, ואורך הרצף מתקצר אוטומטית עם פחות פריימים.
        end: "+=" + FRAME_COUNT * 44,
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
      onUpdate: () => {
        render(state.frame);
        updateOverlay();
      },
    });

    render(0);
    updateOverlay();
    // מדידה מחדש אחרי שהפריסה התייצבה (גופנים/תמונות).
    const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(refreshId);
      if (resizeRaf) window.cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", onResize);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ready, reduced, images]);

  return (
    <section
      ref={wrapRef}
      className={styles.hero}
      id="hero"
      aria-label="כותרת ראשית — סדנת מוזיקה לילדים"
      style={{ backgroundImage: `url("${asset(POSTER_SRC)}")` }}
    >
      {/* רקע: בזמן reduced-motion מציגים פוסטר סטטי, אחרת canvas. */}
      {reduced ? (
        <img
          className={styles.poster}
          src={asset(POSTER_SRC)}
          alt="מורה מנגן על תוף ג'מבה במעגל של ילדים מריעים בסדנת מוזיקה"
        />
      ) : (
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          role="img"
          aria-label="רצף וידאו: מורה מנגן בתוף ג'מבה עם קבוצת ילדים בסדנת מוזיקה"
        />
      )}

      <div className={styles.scrim} aria-hidden="true" />

      {/* מסך טעינה עם אחוזי התקדמות */}
      {!reduced && !ready && (
        <div className={styles.loader} role="status" aria-live="polite">
          <div className={styles.loaderBeats} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className={styles.loaderText}>טוענים את הקצב…</p>
          <div className={styles.loaderBar} aria-hidden="true">
            <div
              className={styles.loaderFill}
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <span className={styles.loaderPct} aria-hidden="true">
            {Math.round(progress * 100)}%
          </span>
          <button type="button" className={styles.loaderSkip} onClick={skip}>
            דלג והתחל לגלול
          </button>
        </div>
      )}

      {/* כיתוב ה-Hero */}
      <div ref={overlayRef} className={styles.overlay}>
        <p className={styles.kicker}>
          {site.brand} · {site.tagline}
        </p>
        <h1 className={styles.title}>מוזיקה מתחילה בתנועה</h1>
        <p className={styles.subtitle}>
          סדנאות מוזיקה חווייתיות לילדים — ריתמוס, כלי הקשה, ושמחה אמיתית
        </p>
        <a className={`btn btn--lg ${styles.cta}`} href="#contact">
          להזמנת סדנה
        </a>
        <div className={styles.scrollHint} aria-hidden="true">
          <span>גללו</span>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
            <path
              d="M12 5v14M6 13l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
