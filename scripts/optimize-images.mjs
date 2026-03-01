/**
 * Resize & compress images in public/assets for faster loading.
 * Usage: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', 'public', 'assets');

const MAX_WIDTH = 1200;
const JPEG_QUALITY = 82;

const EXT = ['.jpg', '.jpeg', '.png', '.JPG', '.PNG'];

function getAllImagePaths(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      getAllImagePaths(full, list);
    } else if (EXT.some(ext => e.name.endsWith(ext))) {
      list.push(full);
    }
  }
  return list;
}

async function optimize(filePath) {
  const rel = path.relative(ROOT, filePath);
  const stat = fs.statSync(filePath);
  const sizeBefore = (stat.size / 1024).toFixed(1);

  let pipeline = sharp(filePath);
  const meta = await pipeline.metadata();
  const needResize = meta.width > MAX_WIDTH;
  if (needResize) {
    pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
  }

  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.png') {
    pipeline = pipeline.png({ compressionLevel: 9 });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  const buf = await pipeline.toBuffer();
  const sizeAfter = (buf.length / 1024).toFixed(1);
  const tmpPath = path.join(path.dirname(filePath), '.tmp-' + path.basename(filePath));
  fs.writeFileSync(tmpPath, buf);
  fs.renameSync(tmpPath, filePath);
  const saved = ((1 - buf.length / stat.size) * 100).toFixed(0);
  console.log(`  ${rel}: ${sizeBefore}KB → ${sizeAfter}KB (${saved}% smaller)`);
}

async function main() {
  console.log('Optimizing images in public/assets...\n');
  const files = getAllImagePaths(ROOT);
  if (files.length === 0) {
    console.log('No images found.');
    return;
  }
  for (const f of files) {
    try {
      await optimize(f);
    } catch (err) {
      console.error(`  Error ${f}:`, err.message);
    }
  }
  console.log('\nDone.');
}

main();
