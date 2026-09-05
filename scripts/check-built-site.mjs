import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(import.meta.dirname, "..");
const publicRoot = path.join(root, "public");
const productionOrigin = "https://andreasnissen.dev";
const failures = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function localTarget(raw) {
  if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("data:")) return undefined;
  let url;
  try {
    url = new URL(raw, `${productionOrigin}/`);
  } catch {
    return undefined;
  }
  if (url.origin !== productionOrigin) return undefined;
  const pathname = decodeURIComponent(url.pathname);
  if (pathname.endsWith("/")) return path.join(publicRoot, pathname, "index.html");
  return path.join(publicRoot, pathname);
}

if (!fs.existsSync(publicRoot)) {
  console.error("Built site is missing. Run Hugo before this validator.");
  process.exit(1);
}

const htmlFiles = walk(publicRoot).filter((file) => file.endsWith(".html"));
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const relative = path.relative(publicRoot, file);
  const ids = new Set([...html.matchAll(/\bid=(?:"([^"]+)"|'([^']+)'|([^\s>]+))/g)].map((match) => match[1] || match[2] || match[3]));

  for (const match of html.matchAll(/(?:href|src)=(?:"([^"]+)"|'([^']+)'|([^\s>]+))/g)) {
    const reference = match[1] || match[2] || match[3];
    if (reference.startsWith("#") && reference.length > 1 && !ids.has(decodeURIComponent(reference.slice(1)))) {
      failures.push(`Broken page section link in ${relative}: ${reference}`);
    }
    const target = localTarget(reference);
    if (target && !fs.existsSync(target)) failures.push(`Broken internal reference in ${relative}: ${reference}`);
  }

  for (const match of html.matchAll(/<script[^>]+type=(?:"application\/ld\+json"|'application\/ld\+json'|application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      failures.push(`Invalid JSON-LD in ${relative}: ${error.message}`);
    }
  }

  if (relative.includes("projects/safe-model-failover-learning-lab/")) {
    if (html.includes("codeRepository")) failures.push(`Project without a verified repository exposes codeRepository in ${relative}`);
  }

  for (const [label, pattern] of [
    ["Open Graph image", /<meta[^>]+property=["']?og:image["']?[^>]+content=/],
    ["Open Graph image width", /<meta[^>]+property=["']?og:image:width["']?[^>]+content=["']?1200["']?/],
    ["Open Graph image height", /<meta[^>]+property=["']?og:image:height["']?[^>]+content=["']?630["']?/],
    ["Open Graph image alt text", /<meta[^>]+property=["']?og:image:alt["']?[^>]+content=/],
    ["large X card", /<meta[^>]+name=["']?twitter:card["']?[^>]+content=["']?summary_large_image["']?/],
    ["X image alt text", /<meta[^>]+name=["']?twitter:image:alt["']?[^>]+content=/]
  ]) {
    if (!pattern.test(html)) failures.push(`Sharing metadata is missing in ${relative}: ${label}`);
  }
}

const writingIndex = fs.readFileSync(path.join(publicRoot, "writing", "index.html"), "utf8");
for (const contract of ["data-writing-tools", "data-writing-search", "data-topic-filter", "data-writing-list", "writing-filter"]) {
  if (!writingIndex.includes(contract)) failures.push(`Writing archive is missing interactive contract: ${contract}`);
}

for (const file of htmlFiles.filter((entry) => entry.includes(`${path.sep}writing${path.sep}`) && !entry.endsWith(`${path.sep}writing${path.sep}index.html`) && !entry.includes(`${path.sep}tags${path.sep}`))) {
  const html = fs.readFileSync(file, "utf8");
  const relative = path.relative(publicRoot, file);
  if (!html.includes("article-evidence-meta")) failures.push(`Writing page is missing evidence metadata: ${relative}`);
  if (!html.includes("article-brief")) failures.push(`Writing page is missing the short-version panel: ${relative}`);
}

const robots = fs.readFileSync(path.join(publicRoot, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${productionOrigin}/sitemap.xml`)) failures.push("Built robots.txt does not advertise the production sitemap");

const index = JSON.parse(fs.readFileSync(path.join(publicRoot, "index.json"), "utf8"));
for (const section of ["writing", "projects", "talks", "impact", "work-i-love"]) {
  if (!index.some((entry) => entry.section === section)) failures.push(`Machine index is missing section: ${section}`);
}
for (const entry of index) {
  for (const property of ["url", "markdownUrl"]) {
    const target = localTarget(entry[property]);
    if (!target || !fs.existsSync(target)) failures.push(`Machine index points to missing ${property}: ${entry[property]}`);
  }
}

if (failures.length) {
  console.error(`Built-site validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML pages, internal references, JSON-LD, sharing metadata, robots.txt, and machine discovery.`);
