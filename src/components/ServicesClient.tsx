'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import { MonitorPlay, Mail, PenTool, Rocket, BookOpen, Search } from 'lucide-react';
import GridOverlay from '@/components/GridOverlay';
import HeroBlobs from '@/components/HeroBlobs';
import CTABanner from '@/components/CTABanner';

export default function ServicesClient() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-desc', {
        y: 30, opacity: 0, duration: 1, delay: 0.4, ease: 'power3.out'
      });

      const cards = gsap.utils.toArray('.svc-card');
      if (cards.length > 0) {
        gsap.fromTo(cards as Element[],
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.services-grid',
              start: 'top 80%',
            }
          }
        );
      }
      
      gsap.fromTo('.section-label', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
      
      gsap.fromTo('#heroHeadline', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );

    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef}>
      {/* Hero Section */}
      <section className="hero hero-sub" id="services-hero">
        <GridOverlay />
        <HeroBlobs 
          style1={{ background: 'radial-gradient(circle, rgba(74,222,128,0.2), transparent)' }} 
          style3={{ background: 'radial-gradient(circle, rgba(163,230,53,0.15), transparent)' }} 
        />
        <div className="container-custom">
          <div className="hero-content">
            <div>
              <div className="section-label">Our Capabilities</div>
              <h1 id="heroHeadline" style={{ marginBottom: '20px' }}>Everything Your Brand Needs to Scale.</h1>
              <p className="hero-desc">From stunning custom websites to professional branding and email setups, we provide end-to-end digital services tailored for modern businesses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Full List */}
      <section className="services-section" id="services-list">
        <div className="container-custom">
          <div className="services-grid">
            <div className="svc-card" style={{ opacity: 0 }}>
              <div className="svc-icon"><MonitorPlay size={26} /></div>
              <h3>Web Design &amp; Development</h3>
              <p>Custom websites built to showcase your business with style, clarity, and ease of use. Responsive, fast-loading, and optimized for search engines.</p>
            </div>
            <div className="svc-card" style={{ opacity: 0 }}>
              <div className="svc-icon"><Mail size={26} /></div>
              <h3>Professional Email Setup</h3>
              <p>Professional email accounts to keep your communication seamless and on-brand. Build trust with a custom domain email address.</p>
            </div>
            <div className="svc-card" style={{ opacity: 0 }}>
              <div className="svc-icon"><PenTool size={26} /></div>
              <h3>Logo &amp; Brand Identity</h3>
              <p>Distinctive logos and brand identities that tell your story and make you memorable. We craft comprehensive brand guidelines.</p>
            </div>
            <div className="svc-card" style={{ opacity: 0 }}>
              <div className="svc-icon"><Rocket size={26} /></div>
              <h3>Digital Marketing Strategy</h3>
              <p>Strategic marketing campaigns to boost visibility, attract your target audience, and convert clicks into loyal customers.</p>
            </div>
            <div className="svc-card" style={{ opacity: 0 }}>
              <div className="svc-icon"><BookOpen size={26} /></div>
              <h3>Content Creation</h3>
              <p>Compelling, SEO-friendly content crafted to engage your audience and strengthen your online presence.</p>
            </div>
            <div className="svc-card" style={{ opacity: 0 }}>
              <div className="svc-icon"><Search size={26} /></div>
              <h3>SEO Optimization</h3>
              <p>Technical and on-page optimization to ensure your website ranks higher on search engines, driving organic traffic.</p>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
