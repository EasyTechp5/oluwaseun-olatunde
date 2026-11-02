// Static quality gate: run `npm test`. Fails on broken links, missing alt text, SEO and a11y basics.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKIP = new Set(["node_modules", ".git", "source", ".claude"]);
const walk = (d) => readdirSync(d).flatMap((f) => {
  if (SKIP.has(f)) return [];
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") ? [p] : [];
});

let problems = 0;
const fail = (file, msg) => { problems++; console.error(`✗ ${file.replace(ROOT + "/", "")}: ${msg}`); };
const pages = walk(ROOT);

for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const is404 = file.endsWith("404.html");
  if (!/<title>[^<]{5,}<\/title>/.test(html)) fail(file, "missing <title>");
  if (!/<meta name="description" content="[^"]{20,}"/.test(html)) fail(file, "missing meta description");
  if (!/<html lang="/.test(html)) fail(file, "missing lang attribute");
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fail(file, `expected exactly one <h1>, found ${h1}`);
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt="/.test(m[0])) fail(file, `image without alt: ${m[0].slice(0, 60)}`);
  for (const m of html.matchAll(/<(input|select|textarea)\b([^>]*)>/g)) {
    const a = m[2];
    if (/type="(hidden|submit)"/.test(a) || /tabindex="-1"/.test(a)) continue;
    const id = (a.match(/\bid="([^"]+)"/) || [])[1];
    if (!id || !new RegExp(`for="${id}"`).test(html)) fail(file, `form control without label: ${m[0].slice(0, 60)}`);
  }
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) fail(file, `duplicate ids: ${[...new Set(dup)].join(", ")}`);
  if (!is404) {
    for (const m of html.matchAll(/(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)) {
      const u = m[1];
      if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(u)) continue;
      let target = resolve(dirname(file), u);
      if (!existsSync(target)) { fail(file, `broken link ${u}`); continue; }
      if (statSync(target).isDirectory() && !existsSync(join(target, "index.html"))) fail(file, `directory link without index ${u}`);
    }
  }
}
console.log(problems ? `\n${problems} problem(s) in ${pages.length} pages` : `✓ ${pages.length} pages passed all checks`);
process.exit(problems ? 1 : 0);
