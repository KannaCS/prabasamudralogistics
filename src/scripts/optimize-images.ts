import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const ORIGINAL_DIR = path.join(PUBLIC_DIR, 'original');
const QUALITY = 80; // Quality setting for WebP (0-100)

// Create the original directory if it doesn't exist
if (!fs.existsSync(ORIGINAL_DIR)) {
  fs.mkdirSync(ORIGINAL_DIR, { recursive: true });
}

// Get all images from the public directory
async function getImageFiles() {
  const files = fs.readdirSync(PUBLIC_DIR);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
  });
}

// Process each image
async function processImage(filename: string) {
  const inputPath = path.join(PUBLIC_DIR, filename);
  const fileInfo = path.parse(filename);
  const outputFilename = `${fileInfo.name}.webp`;
  const outputPath = path.join(PUBLIC_DIR, outputFilename);
  const backupPath = path.join(ORIGINAL_DIR, filename);

  // Skip if already processed
  if (fs.existsSync(outputPath)) {
    console.log(`Skipping ${filename} - WebP version already exists`);
    return;
  }

  try {
    // Get image dimensions for logging
    const metadata = await sharp(inputPath).metadata();
    
    // Create a backup of the original image
    fs.copyFileSync(inputPath, backupPath);
    
    // Convert to WebP with specified quality
    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    // Compare file sizes for logging
    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(2);
    
    console.log(`Optimized: ${filename} (${metadata.width}x${metadata.height}) -> ${outputFilename}`);
    console.log(`  Size: ${(originalSize/1024).toFixed(2)}KB -> ${(newSize/1024).toFixed(2)}KB (${savings}% savings)`);
    
    // Remove the original file from public (it's backed up in original/)
    fs.unlinkSync(inputPath);
  } catch (error) {
    console.error(`Error processing ${filename}:`, error);
  }
}

async function main() {
  try {
    const imageFiles = await getImageFiles();
    console.log(`Found ${imageFiles.length} images to process`);
    
    // Process images sequentially to avoid memory issues
    for (const file of imageFiles) {
      await processImage(file);
    }
    
    console.log('Image optimization complete!');
    console.log(`Original images backed up to ${ORIGINAL_DIR}`);
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

main(); 