
import sharp from 'sharp';
import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

const convertToWebP = async () => {
    // Find all PNG and JPG/JPEG images in src/assets and specified public folders
    // Excluding node_modules and output directories
    const images = await glob('src/assets/**/*.{png,jpg,jpeg,JPG,PNG}', { ignore: 'node_modules/**' });
    const publicImages = await glob('public/images/**/*.{png,jpg,jpeg,JPG,PNG}', { ignore: 'node_modules/**' });

    const allImages = [...images, ...publicImages];

    console.log(`Found ${allImages.length} images to optimize...`);

    let savedBytes = 0;

    for (const file of allImages) {
        try {
            const ext = path.extname(file);
            const newFile = file.replace(ext, '.webp');

            const statsBefore = await fs.stat(file);

            // Convert to WebP
            await sharp(file)
                .webp({ quality: 80 }) // 80% quality is usually a sweet spot for size/visuals
                .toFile(newFile);

            const statsAfter = await fs.stat(newFile);
            const savings = statsBefore.size - statsAfter.size;
            savedBytes += savings;

            console.log(`Converted: ${path.basename(file)} (${(statsBefore.size / 1024 / 1024).toFixed(2)} MB) -> ${(statsAfter.size / 1024 / 1024).toFixed(2)} MB`);

            // Delete original file to save space
            await fs.unlink(file);
        } catch (error) {
            console.error(`Error converting ${file}:`, error);
        }
    }

    console.log(`Total space saved: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
    console.log("Optimization complete!");
};

convertToWebP();
