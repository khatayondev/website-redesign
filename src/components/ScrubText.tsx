'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrubText({ text, className = '' }: { text: string; className?: string }) {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    // Split the text into individual words
    const words = text.split(' ');
    textRef.current.innerHTML = ''; // Clear original text
    
    words.forEach(word => {
      const span = document.createElement('span');
      span.innerText = word;
      span.style.opacity = '0.2'; // Start faded out
      textRef.current?.appendChild(span);
      textRef.current?.appendChild(document.createTextNode(' '));
    });

    const spans = textRef.current.querySelectorAll('span');

    const ctx = gsap.context(() => {
      gsap.to(spans, {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
          end: 'bottom 40%',
          scrub: true,
        },
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        color: 'var(--text-white)' // Ensure it illuminates brightly
      });
    }, textRef);

    return () => ctx.revert();
  }, [text]);

  return (
    <p ref={textRef} className={className}>
      {text}
    </p>
  );
}
