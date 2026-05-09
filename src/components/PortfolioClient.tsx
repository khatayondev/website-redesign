'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import GridOverlay from '@/components/GridOverlay';
import HeroBlobs from '@/components/HeroBlobs';
import CTABanner from '@/components/CTABanner';
import './PortfolioClient.css';

export default function PortfolioClient() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-desc', {
        y: 30, opacity: 0, duration: 1, delay: 0.4, ease: 'power3.out'
      });

      const cards = gsap.utils.toArray('.portfolio-card');
      if (cards.length > 0) {
        gsap.fromTo(cards as Element[],
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.portfolio-grid',
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
      <section className="hero hero-sub" id="portfolio-hero">
        <GridOverlay />
        <HeroBlobs 
          style1={{ background: 'radial-gradient(circle, rgba(250,204,21,0.1), transparent)' }} 
          style2={{ background: 'radial-gradient(circle, rgba(163,230,53,0.15), transparent)' }} 
        />
        <div className="container-custom">
          <div className="hero-content">
            <div>
              <div className="section-label">Our Work</div>
              <h1 id="heroHeadline" style={{ marginBottom: '20px' }}>Projects Crafted With Care &amp; Skill.</h1>
              <p className="hero-desc">A glimpse at websites, logos, and brands we've built for our clients with precision and creativity. We take pride in delivering results that exceed expectations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="portfolio section">
        <div className="container-custom">
          <div className="portfolio-grid">
            {/* Card 1 */}
            <div className="portfolio-card" style={{ opacity: 0 }}>
              <div className="portfolio-card-thumb">
                <div className="card-visual">
                  <img src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=800&auto=format&fit=crop" alt="Dark moody sports car" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.5 }} />
                  <div className="cv-content">
                    <div className="mock-bar"><span></span><span></span><span></span></div>
                    <div className="mock-body">
                      <div className="mock-line w50"></div>
                      <div className="mock-line w90"></div>
                      <div className="mock-line w70"></div>
                      <div className="mock-line accent"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="portfolio-card-info">
                <span className="p-tag">Web Design</span>
                <h3>DYA Automotive</h3>
                <p>Clean, modern website for an automotive business.</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="portfolio-card" style={{ opacity: 0 }}>
              <div className="portfolio-card-thumb">
                <div className="card-visual">
                  <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop" alt="Elegant dark workspace" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.5 }} />
                  <div className="cv-content">
                    <div className="mock-bar"><span></span><span></span><span></span></div>
                    <div className="mock-body">
                      <div className="mock-line w70"></div>
                      <div className="mock-line w90"></div>
                      <div className="mock-line w30"></div>
                      <div className="mock-line accent"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="portfolio-card-info">
                <span className="p-tag">Branding</span>
                <h3>KEDOXINC</h3>
                <p>Brand identity and website crafted with precision.</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="portfolio-card" style={{ opacity: 0 }}>
              <div className="portfolio-card-thumb">
                <div className="card-visual">
                  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop" alt="Laptop on dark desk" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.5 }} />
                  <div className="cv-content">
                    <div className="mock-bar"><span></span><span></span><span></span></div>
                    <div className="mock-body">
                      <div className="mock-line w90"></div>
                      <div className="mock-line w50"></div>
                      <div className="mock-line w70"></div>
                      <div className="mock-line accent"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="portfolio-card-info">
                <span className="p-tag">Web + Email</span>
                <h3>Eunity Delaware LLC</h3>
                <p>Professional web presence and email setup.</p>
              </div>
            </div>
            {/* Card 4 */}
            <div className="portfolio-card" style={{ opacity: 0 }}>
              <div className="portfolio-card-thumb">
                <div className="card-visual">
                  <img src="https://images.unsplash.com/photo-1620189507195-68309c04c4d0?q=80&w=800&auto=format&fit=crop" alt="Dark aesthetic coffee beans" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.5 }} />
                  <div className="cv-content">
                    <div className="mock-bar"><span></span><span></span><span></span></div>
                    <div className="mock-body">
                      <div className="mock-line w30"></div>
                      <div className="mock-line w90"></div>
                      <div className="mock-line w70"></div>
                      <div className="mock-line accent"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="portfolio-card-info">
                <span className="p-tag">Logo Design</span>
                <h3>Pump Foods LLC</h3>
                <p>Complete brand identity and digital presence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
