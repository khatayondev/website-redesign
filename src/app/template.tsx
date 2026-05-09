'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const transitionRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (transitionRef.current) {
      gsap.fromTo(
        transitionRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [pathname]);

  return (
    <div ref={transitionRef} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
