import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import handler from "serve-handler";
import { handleLeadsMailRequest } from "./server/sendLeadMail.mjs";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(rootDir, "dist");
const port = Number(process.env.PORT || 3000);

createServer(async (req, res) => {
  const url = req.url?.split("?")[0];
  if (url === "/api/leads-mail") {
    await handleLeadsMailRequest(req, res);
    return;
  }

  return handler(req, res, {
    public: distDir,
    cleanUrls: true,
  });
}).listen(port, "0.0.0.0", () => {
  console.log(`snaplanding listening on ${port}`);
});
