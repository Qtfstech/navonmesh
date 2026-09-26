import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig, type Plugin } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

const SITE_URL = "https://navonmesh.in";

// Shareable deep links (/register, /admin, /sponsorship) must load even on a static host
// with no "fall back to index.html" rule: copy the app shell to <route>/index.html so the
// server finds a real file. Asset URLs in index.html are absolute, so the copies just work.
// Each copy also gets its own title/description/canonical baked in, so search engines and
// link previews see the right text without running JavaScript.
const deepLinkRoutes: Record<string, { title: string; description: string; noindex?: boolean }> = {
  register: {
    title: "Register | Navonmesh Summit 2026, Hyderabad",
    description:
      "Register for Navonmesh Summit 2026 (29–31 Oct, CMR Campus, Hyderabad) as an organization or individual — delegate passes, expo, sponsorship and award nominations.",
  },
  stalls: {
    title: "Book a Stall | Navonmesh Summit 2026 Tech Expo",
    description:
      "Book an exhibition stall at Navonmesh Summit 2026 Tech Expo (29–31 Oct, Hyderabad) — showcase products and solutions to enterprise buyers. Last date: 25 Oct 2026.",
  },
  "startup-pitches": {
    title: "Startup Pitches | Navonmesh Summit 2026",
    description:
      "Pitch your startup or innovation at Navonmesh Summit 2026 (29–31 Oct, Hyderabad) to industry leaders, investors and mentors. Last date: 25 Oct 2026.",
  },
  speakers: {
    title: "Call for Speakers | Navonmesh Summit 2026",
    description:
      "Apply to speak at Navonmesh Summit 2026 (29–31 Oct, Hyderabad) — keynotes, panels, workshops and technical talks. Last date: 10 Oct 2026.",
  },
  oem: {
    title: "OEM Registration | Navonmesh Summit 2026",
    description:
      "Register your manufacturing company for the OEM Pavilion at Navonmesh Summit 2026 (29–31 Oct, Hyderabad) — meet buyers and integrators. Last date: 15 Oct 2026.",
  },
  awards: {
    title: "Nominate for Awards | Navonmesh Summit 2026",
    description:
      "Nominate an organization or individual for the Navonmesh Summit 2026 awards, recognising innovation across telecom, Industry 4.0, energy and agri-tech.",
  },
  hackathon: {
    title: "BSNL HackFest | Navonmesh Summit 2026",
    description:
      "Register for BSNL HackFest at Navonmesh Summit 2026 (29–31 Oct, Hyderabad) — build real-world automation, 5G and IoT prototypes. ₹499/- per participant. Last date: 25 Oct 2026.",
  },
  sponsorship: {
    title: "Sponsorship | Navonmesh Summit 2026",
    description:
      "Partner with Navonmesh Summit 2026 as a sponsor — title, platinum and other tiers, benefits and next steps for India's national tech conclave in Hyderabad.",
  },
  admin: {
    title: "Admin | Navonmesh Summit 2026",
    description: "Navonmesh Summit 2026 admin dashboard.",
    noindex: true,
  },
};

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function deepLinkShells(): Plugin {
  let outDir = "dist";
  return {
    name: "deep-link-shells",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const shell = readFileSync(join(outDir, "index.html"), "utf8");
      for (const [route, meta] of Object.entries(deepLinkRoutes)) {
        const title = escapeHtml(meta.title);
        const description = escapeHtml(meta.description);
        // Trailing slash: nginx serves <route>/index.html at /<route>/ and 301-redirects /<route>
        // there, so this is the URL search engines actually land on.
        const url = `${SITE_URL}/${route}/`;
        let html = shell
          .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
          .replace(/(<meta name="description" content=")[^"]*"/, `$1${description}"`)
          .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${title}"`)
          .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${description}"`)
          .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
          .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`);
        if (meta.noindex) {
          html = html.replace("</title>", `</title>\n    <meta name="robots" content="noindex" />`);
        }
        mkdirSync(join(outDir, route), { recursive: true });
        writeFileSync(join(outDir, route, "index.html"), html);
      }
    },
  };
}

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
    deepLinkShells(),
  ],
  // Mirrors production nginx: with VITE_API_BASE_URL empty, the app calls /api on its own
  // origin, so dev/preview forward /api to the local backend instead of serving index.html.
  server: {
    proxy: { "/api": "http://localhost:4000" },
  },
  preview: {
    proxy: { "/api": "http://localhost:4000" },
  },
});
