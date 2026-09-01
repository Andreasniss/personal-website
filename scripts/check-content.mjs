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
  "layouts/_default/list.markdown.md",
  "layouts/_default/single.html",
  "layouts/404.html",
  "layouts/robots.txt",
  "layouts/partials/footer.html",
  "layouts/partials/project-evidence.html",
  "assets/css/main.css",
  "assets/js/writing-filter.js",
  "scripts/generate-social-images.sh",
  "scripts/check-built-site.mjs",
  "static/images/profile-mark.png",
  "static/images/og-default.png",
  "static/images/og-default.svg",
  "static/images/social/default.png",
  "static/icons/github.svg",
  "static/icons/linkedin-in.svg",
  "static/icons/x-twitter.svg",
  "static/icons/rss.svg",
  "content/about/_index.md",
  "content/impact/_index.md",
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

  if (!isValidator && /\b(?:TODO|TBD)\b|lorem ipsum|your-domain|placeholder/i.test(content)) {
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

function isPublishable(frontmatter, now = new Date()) {
  if (frontmatterValue(frontmatter, "draft") === "true") return false;

  const publishDate = frontmatterValue(frontmatter, "publishDate") ?? frontmatterValue(frontmatter, "date");
  if (publishDate && new Date(publishDate) > now) return false;

  const expiryDate = frontmatterValue(frontmatter, "expiryDate");
  if (expiryDate && new Date(expiryDate) <= now) return false;

  return true;
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
  for (const field of ["primaryTopic", "evidenceLabel", "evidenceBoundary", "lastVerified"]) {
    if (!frontmatterValue(frontmatter, field)) {
      failures.push(`Evidence-led article is missing ${field} in ${path.relative(root, file)}`);
    }
  }
  const keyPointsBlock = frontmatter.match(/^keyPoints:\s*\n((?:\s{2}-\s+.+\n?)+)/m);
  const keyPointCount = keyPointsBlock ? (keyPointsBlock[1].match(/^\s{2}-\s+.+$/gm) || []).length : 0;
  if (keyPointCount < 3) {
    failures.push(`Evidence-led article needs at least three keyPoints in ${path.relative(root, file)}`);
  }
}

const featuredArticleFiles = articleFiles.filter((file) => {
  const raw = fs.readFileSync(file, "utf8");
  const frontmatter = raw.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "";
  return /^featured:\s*true$/m.test(frontmatter) && isPublishable(frontmatter);
});
if (featuredArticleFiles.length !== 3) {
  failures.push(`Homepage must feature exactly three articles, found ${featuredArticleFiles.length}`);
}

const projectFiles = contentFiles.filter((file) => file.includes(`${path.sep}projects${path.sep}`) && !file.endsWith("_index.md"));
for (const file of projectFiles) {
  const raw = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);
  const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatterMatch || !/^evidenceReady:\s*true$/m.test(frontmatterMatch[1])) continue;

  for (const field of [
    "lastVerified",
    "reviewerFallback",
    "reviewerFallbackURL",
    "architectureImage",
    "architectureAlt",
    "architectureCaption"
  ]) {
    if (!new RegExp(`^${field}:\\s*.+$`, "m").test(frontmatterMatch[1])) {
      failures.push(`Evidence-ready project is missing ${field} in ${relative}`);
    }
  }

  for (const field of ["proofStats", "reviewerPath", "evidenceRows", "limitations"]) {
    if (!new RegExp(`^${field}:\\s*\\n\\s+-\\s+`, "m").test(frontmatterMatch[1])) {
      failures.push(`Evidence-ready project is missing populated ${field} in ${relative}`);
    }
  }

  const architectureImage = frontmatterValue(frontmatterMatch[1], "architectureImage");
  if (architectureImage) {
    const architecturePath = path.join(root, "static", architectureImage.replace(/^\//, ""));
    if (!fs.existsSync(architecturePath)) failures.push(`Project architecture image is missing in ${relative}: ${architectureImage}`);
  }
}

const featuredProjectFiles = projectFiles.filter((file) => {
  const raw = fs.readFileSync(file, "utf8");
  const frontmatter = raw.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "";
  return /^featured:\s*true$/m.test(frontmatter) && isPublishable(frontmatter);
});
if (featuredProjectFiles.length !== 3) {
  failures.push(`Homepage must feature exactly three projects, found ${featuredProjectFiles.length}`);
}
for (const file of featuredProjectFiles) {
  if (!/^evidenceReady:\s*true$/m.test(fs.readFileSync(file, "utf8"))) {
    failures.push(`Homepage project must satisfy the evidence-ready contract: ${path.relative(root, file)}`);
  }
}

function pngDimensions(file) {
  const buffer = fs.readFileSync(file);
  if (buffer.length < 24 || buffer.toString("ascii", 1, 4) !== "PNG") return undefined;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

const talkFiles = contentFiles.filter((file) => file.includes(`${path.sep}talks${path.sep}`) && !file.endsWith("_index.md"));
const socialContentFiles = [
  ...articleFiles,
  ...projectFiles,
  ...talkFiles,
  path.join(root, "content", "about", "_index.md"),
  path.join(root, "content", "impact", "_index.md"),
  path.join(root, "content", "talks", "_index.md")
];

for (const file of socialContentFiles) {
  const raw = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);
  const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatterMatch) continue;
  const socialImage = frontmatterValue(frontmatterMatch[1], "socialImage");
  const socialImageAlt = frontmatterValue(frontmatterMatch[1], "socialImageAlt");
  if (!socialImage) {
    failures.push(`Page-specific social image is missing in ${relative}`);
    continue;
  }
  if (!socialImageAlt) failures.push(`Social image alt text is missing in ${relative}`);
  const socialPath = path.join(root, "static", socialImage.replace(/^\//, ""));
  if (!fs.existsSync(socialPath)) {
    failures.push(`Social image asset is missing in ${relative}: ${socialImage}`);
    continue;
  }
  const dimensions = pngDimensions(socialPath);
  if (!dimensions || dimensions.width !== 1200 || dimensions.height !== 630) {
    failures.push(`Social image must be a 1200x630 PNG in ${relative}: ${socialImage}`);
  }
}

const referenceFiles = contentFiles.filter((file) => file.includes(`${path.sep}work-i-love${path.sep}`) && !file.endsWith("_index.md"));
for (const file of referenceFiles) {
  const raw = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);
  const frontmatter = raw.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "";
  if (!/^creator:\s*".+"$/m.test(raw)) failures.push(`Missing original creator in ${relative}`);
  if (!/^format:\s*".+"$/m.test(raw)) failures.push(`Missing reference format in ${relative}`);
  if (!/^affiliation:\s*".+"$/m.test(frontmatter)) failures.push(`Missing current affiliation in ${relative}`);
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
for (const destination of ["GitHub profile", "LinkedIn", "RSS feed"]) {
  if (!footer.includes(destination)) failures.push(`Footer destination is missing: ${destination}`);
}

const header = fs.readFileSync(path.join(root, "layouts/partials/header.html"), "utf8");
if (!header.includes('images/profile-mark.png')) failures.push("GitHub profile mark is missing from the site header");
if (header.includes('>AN<')) failures.push("Generic AN header tile is still present");

const head = fs.readFileSync(path.join(root, "layouts/partials/head.html"), "utf8");
for (const socialSurface of ["rel=\"icon\"", "rel=\"apple-touch-icon\"", "og:image", "og:image:width", "og:image:height", "og:image:alt", "summary_large_image", "twitter:image", "twitter:image:alt"]) {
  if (!head.includes(socialSurface)) failures.push(`Social metadata is missing: ${socialSurface}`);
}

const config = fs.readFileSync(path.join(root, "hugo.yaml"), "utf8");
if (!config.includes('baseURL: "https://andreasnissen.dev/"')) failures.push("Production base URL is missing or incorrect");
if (!config.includes('socialImage: "/images/social/default.png"')) failures.push("Default social image is missing or incorrect");
if (!config.includes('sourceURL: "https://github.com/Andreasniss/personal-website"')) failures.push("Verified public source URL is missing or incorrect");
for (const [surface, content] of [["footer", footer], ["Person metadata", head]]) {
  if (/https:\/\/(?:www\.)?x\.com\//i.test(content) || /\.?site\.params\.xurl/i.test(content)) {
    failures.push(`Personal X profile must remain unpublished in the ${surface} until its activation gate is satisfied`);
  }
}
if (/^\s+xURL\s*:/im.test(config)) failures.push("Personal X profile configuration must remain absent until its activation gate is satisfied");
if (!/name:\s*["']?Projects["']?[\s\S]*?weight:\s*10[\s\S]*?name:\s*["']?Writing["']?[\s\S]*?weight:\s*20/m.test(config)) {
  failures.push("Primary navigation must order Projects before Writing");
}

const talkIndex = fs.readFileSync(path.join(root, "content/talks/_index.md"), "utf8");
if (/^draft:\s*true$/m.test(talkIndex)) failures.push("The honest Talks direction page must remain public");
for (const file of talkFiles) {
  const raw = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);
  if (!/^draft:\s*(?:true|false)$/m.test(raw)) failures.push(`Talk page must carry an explicit draft value in ${relative}`);
  if (/^draft:\s*false$/m.test(raw)) {
    for (const heading of ["The question", "Audience", "Verified delivery", "Discussion path", "Participant outcome", "Public artifacts"]) {
      if (!raw.includes(`## ${heading}`)) failures.push(`Published talk is missing ${heading} in ${relative}`);
    }
  }
}

for (const relative of ["layouts/index.llmstxt.txt", "layouts/index.json.json", "assets/js/webmcp.js"]) {
  const publicSurface = fs.readFileSync(path.join(root, relative), "utf8");
  if (!/talks?/i.test(publicSurface)) failures.push(`Published talks are missing from machine discovery: ${relative}`);
}

const robots = fs.readFileSync(path.join(root, "layouts/robots.txt"), "utf8");
if (!robots.includes("Sitemap:")) failures.push("robots.txt must advertise the sitemap");

if (failures.length) {
  console.error(`Site validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Validated ${contentFiles.length} content pages, ${articleFiles.length} launch articles, ${referenceFiles.length} curated references, ${templateFiles.length} Hugo templates, attribution, metadata, CSS structure, and production configuration.`);
