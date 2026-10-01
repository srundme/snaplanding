import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import handler from "serve-handler";
import { handleLeadsMailRequest } from "./server/sendLeadMail.mjs";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(rootDir, "dist");
const port = Number(process.env.PORT || 3000);

function hasStaticMatch(pathname) {
  if (pathname === "/" || pathname === "") return true;
  const clean = pathname.replace(/^\//, "").replace(/\/$/, "");
  const exact = path.join(distDir, clean);
  return (
    fs.existsSync(exact) ||
    fs.existsSync(exact + ".html") ||
    fs.existsSync(path.join(exact, "index.html"))
  );
}

createServer(async (req, res) => {
  const url = req.url?.split("?")[0] || "/";
  if (url === "/api/leads-mail") {
    await handleLeadsMailRequest(req, res);
    return;
  }

  // SPA fallback for direct navigation to client-side routes that lack a static prerendered file
  if (req.method === "GET" && !path.extname(url) && !hasStaticMatch(url)) {
    const indexPath = path.join(distDir, "index.html");
    if (fs.existsSync(indexPath)) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      fs.createReadStream(indexPath).pipe(res);
      return;
    }
  }

  return handler(req, res, {
    public: distDir,
    cleanUrls: true,
  });
}).listen(port, "0.0.0.0", () => {
  console.log(`snaplanding listening on ${port}`);
});
