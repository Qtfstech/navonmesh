import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Plain client-rendered React + Vite app — no TanStack Start, no Nitro, no SSR.
// `npm run build` emits a static `dist/` folder that nginx (or any static file
// server) serves directly; there is no Node process to run for the frontend.
export default defineConfig({
  plugins: [
    // Generates src/routeTree.gen.ts from the file-based routes in src/routes.
    // Must come before viteReact() per TanStack Router's setup docs.
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
    // Resolves the "@/*" -> "./src/*" alias declared in tsconfig.json.
    tsconfigPaths(),
  ],
});
