import React from 'react';
import './MaskText.css';

interface MaskTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function MaskText({ text, className = '', delay = 0 }: MaskTextProps) {
  // Split text by space for words
  const words = text.split(' ');
  
  return (
    <span className={`mask-text-wrapper ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="mask-word-container">
          <span className="mask-word" style={{ animationDelay: `${delay + i * 0.05}s` }}>
            {word}
          </span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
}
