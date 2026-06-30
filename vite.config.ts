import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// בפרודקשן האתר מתארח תחת תת-נתיב ב-GitHub Pages: /music-workshop/
// (אם שם ה-repo משתנה — עדכן כאן). בפיתוח נשאר '/'.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/music-workshop/" : "/",
  plugins: [react()],
}));
