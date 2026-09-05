import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";

const { values } = parseArgs({ options: {
  host: { type: "string", default: "127.0.0.1" },
  port: { type: "string", default: "4173" },
  strictPort: { type: "boolean", default: true }
} });
const root = path.resolve(import.meta.dirname, "../public");
if (!fs.existsSync(path.join(root, "index.html"))) {
  throw new Error("Build the site with Hugo before starting the preview.");
}
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".ico": "image/x-icon", ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8", ".md": "text/plain; charset=utf-8"
};
const server = http.createServer((req, res) => {
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405, { Allow: "GET, HEAD" }); return res.end();
  }
  let file;
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://preview.local").pathname);
    file = path.resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(`${root}${path.sep}`)) throw new Error("Invalid path");
    if (fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    file = fs.realpathSync(file);
    if (!file.startsWith(`${root}${path.sep}`)) throw new Error("Invalid path");
  } catch {
    res.writeHead(404); return res.end("Not found");
  }
  if (!fs.existsSync(file)) { res.writeHead(404); return res.end("Not found"); }
  res.writeHead(200, {
    "Content-Type": types[path.extname(file)] || "application/octet-stream",
    "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff"
  });
  if (req.method === "HEAD") return res.end();
  const stream = fs.createReadStream(file);
  stream.on("error", () => res.destroy());
  stream.pipe(res);
});
server.on("error", (error) => { console.error(error.message); process.exit(1); });
server.listen(Number(values.port), values.host, () => console.log(`Preview listening on ${values.host}:${values.port}`));
