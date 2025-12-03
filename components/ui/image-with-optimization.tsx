'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

interface ImageWithOptimizationProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  enableBlurPlaceholder?: boolean;
}

/**
 * Optimized image component wrapper using Next.js Image
 *
 * Features:
 * - Automatic image optimization (AVIF, WebP)
 * - Responsive image sizes
 * - Blur placeholder support
 * - Fallback image handling
 * - Lazy loading by default
 *
 * Requirements: 2.1, 2.2, 2.3, 8.4
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ImageWithOptimization
 *   src="/images/wedding-photo.jpg"
 *   alt="Wedding ceremony"
 *   width={800}
 *   height={600}
 * />
 *
 * // With custom sizes and no blur placeholder
 * <ImageWithOptimization
 *   src="/images/hero.jpg"
 *   alt="Hero image"
 *   width={1920}
 *   height={1080}
 *   sizes="100vw"
 *   enableBlurPlaceholder={false}
 *   priority
 * />
 *
 * // With custom fallback
 * <ImageWithOptimization
 *   src="/images/gallery/photo1.jpg"
 *   alt="Gallery photo"
 *   width={400}
 *   height={300}
 *   fallbackSrc="/images/placeholder.jpg"
 * />
 * ```
 */
export function ImageWithOptimization({
  src,
  alt,
  fallbackSrc = ERROR_IMG_SRC,
  enableBlurPlaceholder = true,
  className,
  sizes,
  priority = false,
  quality = 85,
  ...props
}: ImageWithOptimizationProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  // Default responsive sizes if not provided
  const defaultSizes = sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

  // Blur placeholder configuration
  const blurDataURL = enableBlurPlaceholder
    ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=='
    : undefined;

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      sizes={defaultSizes}
      quality={quality}
      priority={priority}
      placeholder={enableBlurPlaceholder ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
      onError={handleError}
      {...props}
    />
  );
}
