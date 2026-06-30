/**
 * בונה נתיב לנכס סטטי מתוך public, עם תחילית ה-base URL.
 * נחוץ לפריסה תחת תת-נתיב (למשל GitHub Pages: /music-workshop/),
 * כי נתיבים מוחלטים שנבנים ב-JS לא מקבלים את ה-base אוטומטית.
 */
export function asset(path: string): string {
  // import.meta.env.BASE_URL תמיד מסתיים ב-"/"
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
}
