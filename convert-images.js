import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const directories = [
    'static/images',
    'static/images/carousel',
    'static/images/gallery',
    'static/images/centers'
];

async function convertToWebP(inputPath, outputPath) {
    try {
        await sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(outputPath);
        console.log(`Converted: ${inputPath} -> ${outputPath}`);
        return true;
    } catch (error) {
        console.error(`Error converting ${inputPath}:`, error.message);
        return false;
    }
}

async function processDirectory(dir) {
    if (!fs.existsSync(dir)) {
        console.log(`Directory not found: ${dir}`);
        return;
    }

    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile()) {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                const outputPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                const success = await convertToWebP(filePath, outputPath);
                if (success) {
                    // Delete original file after successful conversion
                    fs.unlinkSync(filePath);
                    console.log(`Deleted original: ${filePath}`);
                }
            }
        }
    }
}

async function main() {
    console.log('Starting image conversion to WebP...\n');

    for (const dir of directories) {
        console.log(`\nProcessing: ${dir}`);
        await processDirectory(dir);
    }

    console.log('\nConversion complete!');
}

main();
