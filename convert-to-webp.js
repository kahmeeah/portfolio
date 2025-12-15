// convert-to-webp.js

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const WORKS_DIR = path.join(process.cwd(), 'public', 'images', 'works');
const BASE_OUTPUT_DIR = path.join(process.cwd(), 'public', 'images');
const PROJECT_FOLDERS = fs.readdirSync(WORKS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

if (PROJECT_FOLDERS.length === 0) {
    console.log(`No project folders found in ${WORKS_DIR}. Exiting.`);
    process.exit(0);
}

console.log(`Starting WebP conversion for ${PROJECT_FOLDERS.length} projects...`);

PROJECT_FOLDERS.forEach(projectFolderName => {
    const SOURCE_DIR = path.join(WORKS_DIR, projectFolderName);
    const OUTPUT_DIR = path.join(BASE_OUTPUT_DIR, 'works-webp', projectFolderName);

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    fs.readdirSync(SOURCE_DIR).forEach(file => {
        const fileExtension = path.extname(file).toLowerCase();
        
        if (fileExtension === '.jpg' || fileExtension === '.jpeg' || fileExtension === '.png') {
            const fileName = path.parse(file).name;
            const inputPath = path.join(SOURCE_DIR, file);
            const outputPath = path.join(OUTPUT_DIR, `${fileName}.webp`);

            sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath)
                .then(() => {
                    console.log(`✓ Converted: ${projectFolderName}/${file} -> ${fileName}.webp`);
                })
                .catch(err => {
                    console.error(`X Failed to convert ${projectFolderName}/${file}:`, err);
                });
        }
    });
});

console.log('Conversion pipeline initiated.');