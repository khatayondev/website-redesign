'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import './CTABanner.css';

export default function CTABanner() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="cta-banner" ref={containerRef}>
      <div className="container-custom">
        <div className="cta-banner-inner">
          <div className="cta-banner-content">
            <h2>Ready to Bring Your <span className="accent">Vision</span> to Life?</h2>
            <p>Let's discuss your project. We'd love to hear from you and help your business grow online.</p>
          </div>
          <div className="cta-banner-actions">
            <Link href="/contact" className="btn-primary">
              Contact Us <ArrowRight size={18} />
            </Link>
            <Link href="/portfolio" className="btn-text">
              See Our Work <span className="arrow"><ArrowRight size={16} /></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
