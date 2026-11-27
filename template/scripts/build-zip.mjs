import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ZipArchive } from "archiver";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const distDir = path.join(root, "dist");

if (!fs.existsSync(distDir) || !fs.statSync(distDir).isDirectory()) {
  console.error("dist не найден: сначала выполните сборку (vite build)");
  process.exit(1);
}

const baseName = `${pkg.name}-${pkg.version}`;
const target = path.join(distDir, `${baseName}.zip`);
const temp = path.join(os.tmpdir(), `${baseName}-${process.pid}-${Date.now()}.zip`);

async function pack() {
  const archive = new ZipArchive({ zlib: { level: 9 } });
  const output = fs.createWriteStream(temp);
  const closed = new Promise((resolve, reject) => {
    output.on("close", resolve);
    output.on("error", reject);
  });

  archive.on("warning", (err) => {
    if (err.code !== "ENOENT") throw err;
    console.warn(`archiver: ${err.message}`);
  });
  archive.on("error", (err) => {
    output.destroy(err);
  });

  archive.pipe(output);
  archive.directory(distDir, false);
  await archive.finalize();
  await closed;
}

try {
  await pack();

  fs.rmSync(target, { force: true });
  try {
    fs.renameSync(temp, target);
  } catch (err) {
    if (err.code !== "EXDEV") throw err;
    fs.copyFileSync(temp, target);
    fs.rmSync(temp, { force: true });
  }

  const size = fs.statSync(target).size;
  console.log(`${path.basename(target)} -> ${Math.round(size / 1024)} kB`);
} catch (err) {
  fs.rmSync(temp, { force: true });
  console.error(`ошибка упаковки: ${err.message}`);
  process.exit(1);
}
