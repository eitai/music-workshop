import { useCallback, useEffect, useRef, useState } from "react";

export interface PreloadState {
  /** ref למערך התמונות הטעונות (יציב בין רינדורים). */
  images: React.RefObject<HTMLImageElement[]>;
  /** התקדמות טעינה 0→1. */
  progress: number;
  /** האם נטענו מספיק פריימים כדי להתחיל (לפי הסף / failsafe / skip). */
  ready: boolean;
  /** דילוג ידני — משחרר את הנעילה מיד (כפתור "דלג" במסך הטעינה). */
  skip: () => void;
}

/**
 * preload חכם של רצף פריימים אל מערך HTMLImageElement,
 * עם מעקב progress והפעלה מוקדמת בסף נתון (ברירת מחדל 80%).
 *
 * כולל failsafe: אם הרשת תקועה ופריימים לא נטענים, הנעילה משתחררת
 * אוטומטית אחרי `failsafeMs` כדי שלא ניתקע את המשתמש.
 *
 * @param paths      נתיבי הפריימים (זהות יציבה — memoize אצל הקורא!)
 * @param threshold  יחס הפריימים שצריך להיטען כדי שהמצב יהפוך ל-ready
 * @param failsafeMs כמה זמן (מ"ש) לחכות לפני שחרור כפוי של הנעילה
 */
export function usePreloadFrames(
  paths: string[],
  threshold = 0.8,
  failsafeMs = 12000,
): PreloadState {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const skip = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (paths.length === 0) return;

    let cancelled = false;
    let loaded = 0;
    const total = paths.length;
    const readyAt = Math.max(1, Math.floor(total * threshold));
    const imgs: HTMLImageElement[] = new Array(total);

    const onSettle = () => {
      if (cancelled) return;
      loaded += 1;
      setProgress(loaded / total);
      if (loaded >= readyAt) setReady(true);
    };

    paths.forEach((src, i) => {
      const img = new Image();
      img.decoding = "async";
      // נטען בסדר; הדפדפן מתזמן את ההורדות בעצמו.
      img.onload = onSettle;
      img.onerror = onSettle; // גם שגיאה נספרת כדי לא לתקוע את ה-progress
      img.src = src;
      imgs[i] = img;
    });

    imagesRef.current = imgs;

    // failsafe — לעולם לא נשאיר את הגלילה נעולה לנצח.
    const failsafe = window.setTimeout(() => {
      if (!cancelled) setReady(true);
    }, failsafeMs);

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      // ניתוק handlers כדי למנוע setState אחרי unmount
      for (const img of imgs) {
        if (img) img.onload = img.onerror = null;
      }
    };
  }, [paths, threshold, failsafeMs]);

  return { images: imagesRef, progress, ready, skip };
}
