    // convert-to-webp.js
import fs from "fs";
import path from "path";
import sharp from "sharp";

const PUBLIC_DIR = "/var/www/ion-boats/public";

async function convert() {
  const files = fs.readdirSync(PUBLIC_DIR);

  for (const file of files) {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;

    const inputPath = path.join(PUBLIC_DIR, file);
    const outputPath = path.join(
      PUBLIC_DIR,
      file.replace(/\.(jpg|jpeg|png)$/i, ".webp")
    );

    // ⛔ Skip if webp already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping ${file} (webp exists)`);
      continue;
    }

    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);

    console.log(`✅ Converted ${file} → ${path.basename(outputPath)}`);
  }

  console.log(" WebP conversion completed");
}

convert().catch(console.error);
