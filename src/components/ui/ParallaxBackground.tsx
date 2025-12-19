'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ParallaxBackgroundProps {
  src: string;
  alt: string;
  speed?: number;
}

export function ParallaxBackground({ src, alt, speed = 0.5 }: ParallaxBackgroundProps) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="absolute inset-0 will-change-transform"
      style={{
        transform: `translateY(${offsetY * speed}px)`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
        quality={85}
      />
    </div>
  );
}
