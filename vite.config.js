import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import fg from "fast-glob";

import { cloudflare } from "@cloudflare/vite-plugin";

// автоматически находим все html файлы
function getHtmlEntries() {
  const files = fg.sync(["*.html", "posts/**/*.html"]);

  const entries = {};

  files.forEach((file) => {
    const name = file.replace(".html", "");
    entries[name] = resolve(__dirname, file);
  });

  return entries;
}

export default defineConfig({
  base: "./",

  plugins: [handlebars({
    partialDirectory: resolve(__dirname, "partials"),
  }), cloudflare()],

  build: {
    rollupOptions: {
      input: getHtmlEntries(),
    },
  },
});