const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const root = __dirname;
const dataDir = path.join(root, "data");
const dataFile = path.join(dataDir, "pms-data.json");
const port = Number(process.env.PORT || 4174);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon"
};

function send(res, status, body, contentType = "application/json; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": contentType,
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 10 * 1024 * 1024) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

async function readState() {
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function writeState(state) {
  await fs.mkdir(dataDir, { recursive: true });
  const payload = {
    ...state,
    savedAt: new Date().toISOString()
  };
  await fs.writeFile(dataFile, JSON.stringify(payload, null, 2), "utf8");
  return payload;
}

async function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = decodeURIComponent(url.pathname);
  const requested = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(root, requested));

  if (!filePath.startsWith(root)) {
    send(res, 403, "Forbidden", "text/plain; charset=utf-8");
    return;
  }

  try {
    const content = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    send(res, 200, content, mimeTypes[ext] || "application/octet-stream");
  } catch (error) {
    if (error.code === "ENOENT") {
      send(res, 404, "Not found", "text/plain; charset=utf-8");
      return;
    }
    throw error;
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

    if (url.pathname === "/api/health") {
      send(res, 200, JSON.stringify({ ok: true, service: "BinguanPMS" }));
      return;
    }

    if (url.pathname === "/api/state" && req.method === "GET") {
      const state = await readState();
      send(res, 200, JSON.stringify({ ok: true, state }));
      return;
    }

    if (url.pathname === "/api/state" && (req.method === "PUT" || req.method === "POST")) {
      const body = await readBody(req);
      const parsed = JSON.parse(body || "{}");
      const state = parsed.state || parsed;
      const saved = await writeState(state);
      send(res, 200, JSON.stringify({ ok: true, state: saved }));
      return;
    }

    if (url.pathname.startsWith("/api/")) {
      send(res, 404, JSON.stringify({ ok: false, error: "API not found" }));
      return;
    }

    await serveStatic(req, res);
  } catch (error) {
    console.error(error);
    send(res, 500, JSON.stringify({ ok: false, error: error.message }));
  }
});

server.listen(port, () => {
  console.log(`Binguan PMS running at http://127.0.0.1:${port}/`);
});
