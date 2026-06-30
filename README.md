# שי בקצב — אתר נחיתה 🥁

אתר נחיתה חד-עמודי בעברית (RTL) ל**שי בקצב** — סדנאות תיפוף, מעגלי קצב, סאונד הילינג והפעלות מוזיקליות לילדים, למבוגרים ולאירועים.

הפתיח הוא אזור **scroll-scrub** בסגנון Apple: רצף פריימים (image sequence) של שי מנגן בתוף ג'מבה, שמתנגן לפי גלילת העמוד ומצויר על `<canvas>`. אחריו נפרסים סקשני התוכן: הכירו את שי, מה אנחנו מציעים, אירועים פרטיים, גלריה ויצירת קשר.

נבנה עם **Vite + React + TypeScript**, **GSAP + ScrollTrigger**, ו-CSS Modules. פלטה: כתום + טורקיז.

---

## הרצה מקומית

צריך **Node.js 18+** (פותח עם Node 24).

```bash
npm install      # התקנת תלויות (פעם אחת)
npm run dev      # שרת פיתוח -> http://localhost:5173
npm run build    # בנייה לפרודקשן (tsc + vite) -> תיקיית dist/
npm run preview  # תצוגה מקדימה של ה-build
npm run lint     # בדיקת קוד (oxlint)
```

---

## מה צריך להחליף לפני העלאה לאוויר ✏️

כל הפרטים האישיים מרוכזים בקובץ אחד: [`src/config.ts`](src/config.ts).

| שדה | מה זה | דוגמה |
| --- | --- | --- |
| `whatsapp` | מספר וואטסאפ בפורמט בינלאומי, בלי `+` ובלי `0` מוביל | `972573255899` |
| `phoneDisplay` / `phoneHref` | טלפון לתצוגה ולקליק | `057-325-5899` / `+972573255899` |
| `email` | אימייל ליצירת קשר / fallback לטופס | `email@shay.gmail.com` |
| `social` | קישורי פייסבוק / אינסטגרם / יוטיוב / טיקטוק | URL מלא (ריק "" מסתיר) |
| `brand` / `teacher` | שם המותג ושם המורה | `שי בקצב` / `שי פריזנר` |

> ⚠️ הטלפון, הוואטסאפ והאימייל הנוכחיים הם **דמה** — ודאו שהם הפרטים האמיתיים.

### תוכן הסקשנים
- **הכירו את שי:** [`src/components/About.tsx`](src/components/About.tsx) — פסקת `TODO` לסיפור אישי + תגיות.
- **מה אנחנו מציעים / אירועים פרטיים:** [`src/components/Services.tsx`](src/components/Services.tsx) — מערכי הכרטיסים (כותרת, טקסט, תמונה) קלים לעריכה.
- **גלריה:** [`src/components/Gallery.tsx`](src/components/Gallery.tsx).
- **כותרת הפתיח (IntroBand):** [`src/components/IntroBand.tsx`](src/components/IntroBand.tsx).

### תמונות
כל התמונות נמצאות ב-`public/photos/` (חולצו מהוידאו `workshop.mp4`). מומלץ להחליף בתמונות אמיתיות מכל תחום (חתונות, סאונד הילינג, ימי גיבוש וכו') — פשוט שמרו קובץ חדש ב-`public/photos/` ועדכנו את הנתיב ב-`Services.tsx` / `Gallery.tsx` / `IntroBand.tsx` / `About.tsx`.

### צבעים, גופנים ולוגו
- פלטה וטיפוגרפיה: משתני CSS בראש [`src/index.css`](src/index.css) (`--orange`, `--teal`, `--navy`...).
- גופנים מ-Google Fonts ב-[`index.html`](index.html) (Fredoka + Varela Round לכותרות, Heebo לגוף).
- לוגו: [`src/components/Logo.tsx`](src/components/Logo.tsx) (תג SVG) — קל להחלפה בלוגו אמיתי.

---

## פריימי הפתיח (image sequence)

הפריימים חולצו מ-`workshop.mp4` עם **ffmpeg** אל:
- `public/frames/` — דסקטופ (181 פריימים, רוחב 1280)
- `public/frames-mobile/` — נייד (181 פריימים, רוחב 640)
- `public/hero-poster.webp` — פוסטר סטטי ל-fallback / `prefers-reduced-motion`

הקוד בוחר אוטומטית בין דסקטופ לנייד לפי רוחב המסך ([`src/lib/frames.ts`](src/lib/frames.ts)).

### לחלץ פריימים מחדש (אם מחליפים וידאו)

```bash
# דסקטופ
ffmpeg -y -i workshop.mp4 -vf "fps=12,scale=1280:-1" -c:v libwebp -quality 80 public/frames/f_%03d.webp
# נייד
ffmpeg -y -i workshop.mp4 -vf "fps=12,scale=640:-1" -c:v libwebp -quality 72 public/frames-mobile/f_%03d.webp
# פוסטר
ffmpeg -y -i workshop.mp4 -vf "select=eq(n\,0),scale=1280:-1" -frames:v 1 -c:v libwebp -quality 85 public/hero-poster.webp
```

לאחר החילוץ — עדכנו את `FRAME_COUNT` ב-[`src/lib/frames.ts`](src/lib/frames.ts).
"אורך הגלילה" של הרצף נשלט ע"י `end` ב-[`src/components/HeroSequence.tsx`](src/components/HeroSequence.tsx).

---

## פריסה (Deploy)

אתר סטטי — מתאים לכל מארח (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

1. `npm run build`
2. העלו את תיקיית `dist/`.

> **שימו לב:** נתיבי התמונות מוחלטים (`/frames/...`, `/photos/...`), ולכן האתר מיועד לרוץ ב-**שורש הדומיין**. לפריסה תחת תת-נתיב — הוסיפו `base` ב-`vite.config.ts` ועדכנו את הנתיבים בהתאם.

---

## נגישות וביצועים

- תמיכה מלאה ב-`prefers-reduced-motion`: למשתמשים שביקשו פחות תנועה מוצג פוסטר סטטי בלי scrub ובלי טעינת 181 הפריימים.
- מסך טעינה עם אחוזי התקדמות + כפתור "דלג", ו-failsafe שמשחרר את הגלילה גם אם הרשת תקועה.
- הגלריה והתמונות נטענות ב-`lazy`, פוקוס נראה לכל קישור/כפתור, ולכל תמונה יש `alt`.

---

## מבנה

```
src/
├── components/
│   ├── Header.tsx        לוגו + ניווט + כפתור "צרו קשר" + וואטסאפ צף
│   ├── HeroSequence.tsx  וידאו ה-scroll-scrub (canvas)
│   ├── IntroBand.tsx     כותרת הפתיח של "שי בקצב"
│   ├── About.tsx         הכירו את שי (טקסט + פורטרט עגול)
│   ├── Services.tsx      מה אנחנו מציעים + אירועים פרטיים
│   ├── Gallery.tsx       גלריית תמונות
│   ├── ContactCTA.tsx    טופס -> וואטסאפ + טלפון + מייל
│   ├── Footer.tsx        פוטר 3 טורים
│   ├── Logo.tsx          תג הלוגו
│   └── BeatField.tsx     תווי מוזיקה מרחפים (אלמנט החתימה)
├── hooks/usePreloadFrames.ts   preload חכם עם progress + failsafe
├── lib/frames.ts               נתיבי פריימים ו-FRAME_COUNT
├── config.ts            ⭐ כל הפרטים להחלפה
├── index.css            מערכת העיצוב הגלובלית
└── App.tsx              הרכבת העמוד
```
