# Image Optimization Guide

This project implements several layers of image optimization to ensure fast loading times and optimal performance.

## Optimizations Implemented

1. **WebP Conversion**
   - All images in the `/public` directory have been converted to WebP format
   - Original images are backed up in `/public/original`
   - WebP offers 25-34% smaller file sizes compared to JPEG with similar quality
   - WebP supports transparency like PNG but with much smaller file sizes

2. **Next.js Image Component**
   - A custom `OptimizedImage` component has been created in `src/components/ui/optimized-image.tsx`
   - This component wraps Next.js's built-in Image component with additional features:
     - Lazy loading
     - Blur-up placeholder
     - Automatic responsive sizes
     - WebP format prioritization

3. **Next.js Configuration**
   - `next.config.js` has been updated with optimized image settings
   - Device and image sizes configured for responsive image serving
   - Cache TTL set to improve performance

## How to Use the OptimizedImage Component

```tsx
import { OptimizedImage } from '@/components/ui/optimized-image';

// Basic usage
<OptimizedImage 
  src="/path/to/image.webp" 
  alt="Description of image" 
  width={800} 
  height={600} 
/>

// With fill mode (takes up parent container space)
<OptimizedImage 
  src="/path/to/image.webp" 
  alt="Description of image" 
  fill 
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// With priority loading (for above-the-fold images)
<OptimizedImage 
  src="/path/to/image.webp" 
  alt="Description of image" 
  width={1200}
  height={800}
  priority 
/>
```

## Re-optimizing Images

If you add new images to the `/public` directory, you can re-run the optimization script:

```bash
npm run optimize-images
```

This will:
1. Convert new images to WebP format
2. Back up originals to `/public/original`
3. Leave already processed WebP images untouched

## Best Practices

1. Always provide `width` and `height` or use `fill` to avoid layout shifts
2. Use `priority` for above-the-fold images
3. Provide descriptive `alt` text for accessibility
4. Use appropriate `sizes` attribute for responsive images
5. Keep originals in the `/public/original` directory for future reference 