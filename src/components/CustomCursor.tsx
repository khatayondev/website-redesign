'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const tracerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    const xToCursor = gsap.quickTo(cursorRef.current, 'left', { duration: 0.1, ease: 'power3' });
    const yToCursor = gsap.quickTo(cursorRef.current, 'top', { duration: 0.1, ease: 'power3' });
    
    const xToTracer = gsap.quickTo(tracerRef.current, 'left', { duration: 0.15, ease: 'power3' });
    const yToTracer = gsap.quickTo(tracerRef.current, 'top', { duration: 0.15, ease: 'power3' });

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      xToCursor(mouseX);
      yToCursor(mouseY);
      xToTracer(mouseX);
      yToTracer(mouseY);
    };

    window.addEventListener('mousemove', onMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('char') ||
        target.tagName.toLowerCase() === 'img'
      ) {
        setIsActive(true);
      }
    };

    const handleMouseOut = () => {
      setIsActive(false);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div 
        ref={tracerRef} 
        className={`mouse-tracer ${isActive ? 'active' : ''}`}
      />
      <div 
        ref={cursorRef} 
        className="custom-cursor"
        style={{
          transform: isActive ? 'translate(-50%, -50%) scale(2.5)' : 'translate(-50%, -50%) scale(1)',
          transition: 'transform 0.3s ease'
        }}
      />
    </>
  );
}
