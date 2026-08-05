"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

const FALLBACK_IMAGE = "/images/placeholder-photo.svg";

interface OptimizedMemoryImageProps extends Omit<ImageProps, "src"> {
  src: string;
}

export function OptimizedMemoryImage({ src, alt, ...props }: OptimizedMemoryImageProps) {
  const [activeSrc, setActiveSrc] = useState(src);

  useEffect(() => {
    setActiveSrc(src);
  }, [src]);

  return (
    <Image
      {...props}
      alt={alt}
      src={activeSrc}
      onError={() => {
        if (activeSrc !== FALLBACK_IMAGE) {
          setActiveSrc(FALLBACK_IMAGE);
        }
      }}
    />
  );
}
