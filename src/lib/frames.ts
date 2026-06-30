/**
 * עזרי פריימים לרצף ה-Hero (image sequence).
 * הפריימים חולצו מהוידאו עם ffmpeg אל public/frames ו-public/frames-mobile.
 */
import { asset } from "./asset";

/** מספר הפריימים בפועל בתיקיית public/frames (עדכן אם מחלצים מחדש). */
export const FRAME_COUNT = 72;

/** פוסטר סטטי ל-fallback / reduced-motion / טעינה (נתיב לוגי, ללא base). */
export const POSTER_SRC = "/hero-poster.webp";

/** האם המסך בגודל נייד — קובע אם לטעון את גרסת הפריימים המוקטנת. */
export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

/** בונה מערך נתיבים לכל הפריימים, מהתיקייה המתאימה. */
export function buildFramePaths(mobile: boolean): string[] {
  const dir = mobile ? "/frames-mobile" : "/frames";
  return Array.from({ length: FRAME_COUNT }, (_, i) =>
    asset(`${dir}/f_${String(i + 1).padStart(3, "0")}.webp`),
  );
}
