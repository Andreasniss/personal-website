import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];

const required = [
  "hugo.yaml",
  ".github/workflows/deploy-pages.yml",
  "layouts/index.html",
  "layouts/_default/baseof.html",
  "layouts/_default/list.html",
  "layouts/_default/single.html",
  "layouts/404.html",
  "layouts/partials/footer.html",
  "assets/css/main.css",
  "static/favicon.svg",
  "static/icons/github.svg",
  "static/icons/linkedin-in.svg",
  "static/icons/x-twitter.svg",
  "static/icons/code.svg",
  "static/icons/rss.svg",
  "content/about/_index.md",
  "content/projects/_index.md",
  "content/talks/_index.md",
  "content/work-i-love/_index.md",
  "content/writing/_index.md"
];

for (const relative of required) {
  if (!fs.existsSync(path.join(root, relative))) {
    failures.push(`Missing required file: ${relative}`);
  }
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const files = walk(root).filter((file) => !file.includes(`${path.sep}public${path.sep}`));
const textFiles = files.filter((file) => /\.(md|html|css|ya?ml|json|mjs|svg)$/.test(file));

for (const file of textFiles) {
  const content = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);
  const isValidator = relative === path.join("scripts", "check-content.mjs");

  if (!isValidator && /TODO|TBD|lorem ipsum|your-domain|placeholder/i.test(content)) {
    failures.push(`Placeholder text found in ${relative}`);
  }
  if (!isValidator && content.includes("—")) {
    failures.push(`Em dash found in ${relative}`);
  }
  if (/\.(md|html)$/.test(file) && /<a\b[^>]*target=["']_blank["'][^>]*>/i.test(content) && !/rel=["'][^"']*noreferrer/.test(content)) {
    failures.push(`Unsafe external target in ${relative}`);
  }
}

const contentFiles = files.filter((file) => file.endsWith(".md") && file.includes(`${path.sep}content${path.sep}`));
for (const file of contentFiles) {
  const content = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    failures.push(`Invalid or missing YAML frontmatter in ${relative}`);
    continue;
  }
  if (!/^title:\s*.+$/m.test(match[1])) failures.push(`Missing title in ${relative}`);
  if (!/^description:\s*.+$/m.test(match[1])) failures.push(`Missing description in ${relative}`);
}

const articleFiles = contentFiles.filter((file) => file.includes(`${path.sep}writing${path.sep}`) && !file.endsWith("_index.md"));
function frontmatterValue(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.*)$`, "m"));
  if (!match) return undefined;
  const value = match[1].replace(/\s+#.*$/, "").trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}

for (const file of articleFiles) {
  const raw = fs.readFileSync(file, "utf8");
  const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatterMatch) continue;
  const frontmatter = frontmatterMatch[1];
  const content = raw.slice(frontmatterMatch[0].length);
  const words = content.trim().split(/\s+/).length;
  if (words < 500) failures.push(`Launch article is too thin (${words} words): ${path.relative(root, file)}`);
  const origin = frontmatterValue(frontmatter, "origin");
  if (!["website", "linkedin"].includes(origin)) {
    failures.push(`Missing or invalid publication origin in ${path.relative(root, file)}`);
  }
  const linkedinURL = frontmatterValue(frontmatter, "linkedinURL");
  if (linkedinURL && !/^https:\/\/www\.linkedin\.com\/feed\/update\/urn:li:activity:\d+\/$/.test(linkedinURL)) {
    failures.push(`Invalid LinkedIn publication URL in ${path.relative(root, file)}`);
  }
  const xURL = frontmatterValue(frontmatter, "xURL");
  if (xURL && !/^https:\/\/(?:www\.)?x\.com\/(?:[A-Za-z0-9_]+\/status\/\d+|i\/article\/\d+)\/?$/.test(xURL)) {
    failures.push(`Invalid X publication URL in ${path.relative(root, file)}`);
  }
  if (origin === "linkedin" && !linkedinURL) {
    failures.push(`LinkedIn-origin article lacks a verified LinkedIn URL in ${path.relative(root, file)}`);
  }
}

const referenceFiles = contentFiles.filter((file) => file.includes(`${path.sep}work-i-love${path.sep}`) && !file.endsWith("_index.md"));
for (const file of referenceFiles) {
  const raw = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);
  if (!/^creator:\s*".+"$/m.test(raw)) failures.push(`Missing original creator in ${relative}`);
  if (!/^format:\s*".+"$/m.test(raw)) failures.push(`Missing reference format in ${relative}`);
  if (!/^sourceURL:\s*"https:\/\/.+"$/m.test(raw)) failures.push(`Missing original source URL in ${relative}`);
  if (!/^why:\s*".+"$/m.test(raw)) failures.push(`Missing personal recommendation in ${relative}`);
  if (/sourceURL:\s*"https:\/\/github\.com\/Andreasniss\//m.test(raw)) failures.push(`Reference points to an Andreas-owned fork in ${relative}`);
}

const css = fs.readFileSync(path.join(root, "assets/css/main.css"), "utf8");
const openBraces = (css.match(/{/g) || []).length;
const closeBraces = (css.match(/}/g) || []).length;
if (openBraces !== closeBraces) failures.push(`CSS braces do not balance: ${openBraces} open, ${closeBraces} closed`);

const templateFiles = files.filter((file) => file.endsWith(".html") && file.includes(`${path.sep}layouts${path.sep}`));
for (const file of templateFiles) {
  const content = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);
  const openings = (content.match(/{{/g) || []).length;
  const closings = (content.match(/}}/g) || []).length;
  if (openings !== closings) failures.push(`Hugo actions do not balance in ${relative}`);
  if (/{{\s*(?:printf\s+)?"\//.test(content) && /\|\s*relURL/.test(content)) {
    failures.push(`Root-relative input passed to relURL in ${relative}`);
  }

  for (const match of content.matchAll(/partial\s+"([^"]+)"/g)) {
    const partial = path.join(root, "layouts", "partials", match[1]);
    if (!fs.existsSync(partial)) failures.push(`Missing partial ${match[1]} referenced by ${relative}`);
  }
}

const footer = fs.readFileSync(path.join(root, "layouts/partials/footer.html"), "utf8");
if (!footer.includes("Built by Andreas Nissen")) failures.push("Creator attribution is missing from the footer");
if (!footer.includes("site.Params.sourceURL")) failures.push("Verified-source hook is missing from the footer");
for (const destination of ["GitHub profile", "LinkedIn", "X", "Source code", "RSS feed"]) {
  if (!footer.includes(destination)) failures.push(`Footer destination is missing: ${destination}`);
}

const config = fs.readFileSync(path.join(root, "hugo.yaml"), "utf8");
if (!config.includes('baseURL: "https://andreasnissen.dev/"')) failures.push("Production base URL is missing or incorrect");
if (!config.includes('sourceURL: "https://github.com/Andreasniss/personal-website"')) failures.push("Verified public source URL is missing or incorrect");
if (!config.includes('xURL: "https://x.com/AndreasNiss2"')) failures.push("Verified X profile URL is missing or incorrect");

if (failures.length) {
  console.error(`Site validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Validated ${contentFiles.length} content pages, ${articleFiles.length} launch articles, ${referenceFiles.length} curated references, ${templateFiles.length} Hugo templates, attribution, metadata, CSS structure, and production configuration.`);
