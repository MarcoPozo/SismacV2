import { existsSync, readdirSync } from "fs";
import { basename, extname, join } from "path";
import { dirname } from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, "../public/images/icons");

const files = readdirSync(iconsDir).filter((f) => extname(f).toLowerCase() === ".png");

console.log(`Convirtiendo ${files.length} PNGs a WebP...`);

let ok = 0;
let skip = 0;

for (const file of files) {
  const input = join(iconsDir, file);
  const output = join(iconsDir, basename(file, ".png") + ".webp");

  if (existsSync(output)) {
    skip++;
    continue;
  }

  try {
    await sharp(input).webp({ quality: 90, lossless: false }).toFile(output);
    ok++;
    console.log(`  ✓ ${file} → ${basename(output)}`);
  } catch (err) {
    console.error(`  ✗ ${file}: ${err.message}`);
  }
}

console.log(`\nListo: ${ok} convertidos, ${skip} ya existían.`);
