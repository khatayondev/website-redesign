'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

import { MonitorPlay, Mail, PenTool, Rocket, Palette, RefreshCw, Star } from 'lucide-react';
import GridOverlay from '@/components/GridOverlay';
import HeroBlobs from '@/components/HeroBlobs';
import CTABanner from '@/components/CTABanner';
import MaskText from '@/components/MaskText';
import ScrubText from '@/components/ScrubText';
import './HomeClient.css';
import './PortfolioClient.css'; // For portfolio preview cards

export default function HomeClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const brandRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Animations
      gsap.from('.hero-desc', {
        y: 30, opacity: 0, duration: 1, delay: 0.8, ease: 'power3.out'
      });

      gsap.from('.hero-buttons', {
        y: 20, opacity: 0, duration: 1, delay: 1, ease: 'power3.out'
      });

      // Floating Tools - Continuous Float + Parallax
      gsap.utils.toArray('.floating-tool').forEach((tool, i) => {
        const el = tool as HTMLElement;
        const speed = parseFloat(el.dataset.speed || '1');

        // 1. Continuous random float
        gsap.to(el, {
          y: '+=20',
          x: '+=15',
          rotation: i % 2 === 0 ? 15 : -15,
          duration: 3 + Math.random() * 2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });

        // 2. Scroll Parallax
        gsap.to(el, {
          yPercent: () => -100 * speed,
          rotation: '+=45', // slowly rotate as you scroll
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      // 2. Scroll Reveals for all .reveal elements
      gsap.utils.toArray('.reveal').forEach(elem => {
        gsap.fromTo(elem as Element,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elem as Element,
              start: 'top 85%',
            }
          }
        );
      });

      // 3. Staggered Grid reveals
      const grids = ['.process-grid', '.services-grid', '.portfolio-preview-grid', '.testimonials-grid'];
      grids.forEach(selector => {
        const grid = document.querySelector(selector);
        if (grid) {
          const cards = Array.from(grid.children).filter(el => !el.classList.contains('process-line'));
          gsap.fromTo(cards,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0,
              stagger: 0.15,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: grid,
                start: 'top 80%',
              }
            }
          );
        }
      });

      // 3.5 Process Line Draw
      gsap.to('.process-line', {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.process-grid',
          start: 'top 70%',
          end: 'bottom 50%',
          scrub: true,
        }
      });

      // 3.8 Smooth Background Morphing for Portfolio Section
      const portfolioSection = document.querySelector('.portfolio-preview');
      if (portfolioSection) {
        gsap.to(portfolioSection, {
          backgroundColor: 'var(--bg-alt-2)',
          ease: 'none',
          scrollTrigger: {
            trigger: portfolioSection,
            start: 'top 50%',
            end: 'bottom 80%',
            scrub: true,
          }
        });
      }

      // 4. Brand Marquee
      if (brandRef.current) {
        gsap.to('.brand-track', {
          xPercent: -50,
          ease: 'none',
          duration: 20,
          repeat: -1
        });
      }

      // 5. Number Counters
      if (statsRef.current) {
        const numbers = statsRef.current.querySelectorAll('.stat-num-val');
        numbers.forEach(num => {
          const target = parseInt((num as HTMLElement).dataset.target || '0');
          gsap.to(num, {
            innerHTML: target,
            duration: 2,
            snap: { innerHTML: 1 },
            ease: 'power1.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%'
            }
          });
        });
      }

      // 5. Water Wiggle Background Effect
      const buttons = document.querySelectorAll('.btn-primary, .btn-outline');
      const displacementMap = document.querySelector('.water-displacement');
      const bgTarget = document.querySelector('.bg-water-target') as HTMLElement;

      buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
          if (bgTarget) bgTarget.style.filter = 'url(#water-filter)';
          gsap.to(displacementMap, {
            attr: { scale: 35 },
            duration: 1.5,
            ease: "elastic.out(1, 0.3)"
          });
        });
        
        btn.addEventListener('mouseleave', () => {
          gsap.to(displacementMap, {
            attr: { scale: 0 },
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
              if (bgTarget) bgTarget.style.filter = 'none';
            }
          });
        });
      });

    }, heroRef);
    return () => ctx.revert();
  }, []);

  const headlineText = "Bringing Your Dream Into Reality.";

  return (
    <div ref={heroRef}>
      {/* Hero */}
      <section className="hero" id="home">
        <div className="bg-water-target" style={{ position: 'absolute', inset: 0, zIndex: 0, transition: 'filter 0.3s' }}>
          <GridOverlay />
          <HeroBlobs />
        </div>

        {/* Floating Tools */}
        <div className="floating-tool tool-1" data-speed="1.2"><PenTool size={96} color="var(--accent)" strokeWidth={1.5} /></div>
        <div className="floating-tool tool-2" data-speed="0.8"><MonitorPlay size={80} color="var(--text-white)" strokeWidth={1.5} /></div>
        <div className="floating-tool tool-3" data-speed="1.5"><Palette size={88} color="var(--yellow)" strokeWidth={1.5} /></div>
        <div className="floating-tool tool-4" data-speed="0.5"><Rocket size={104} color="var(--accent)" strokeWidth={1.5} /></div>

        <div className="container-custom">
          <div className="hero-content">
            <h1 ref={headlineRef} style={{ marginBottom: '20px' }}>
              <MaskText text="Bringing Your Dream Into Reality." />
            </h1>
            <p className="hero-desc">We increase revenue and ensure sustainable long-term growth for your business through powerful, custom-designed digital experiences.</p>
            <div className="hero-buttons">
              <Link href="/contact" className="btn-primary" style={{ background: 'var(--accent)', color: '#000', padding: '18px 40px' }}>
                Book A Meeting
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Bar */}
      <section className="brand-bar reveal" ref={brandRef}>
        <div className="container-custom">
          <div className="brand-bar-label">Trusted by amazing brands</div>
          <div className="brand-marquee">
            <div className="brand-track">
              {/* Duplicate for infinite scroll */}
              {Array(2).fill(0).map((_, idx) => (
                <div key={idx} className="brand-group">
                  <div className="brand-item">Layers</div>
                  <div className="brand-item">Quotient</div>
                  <div className="brand-item">Circoole</div>
                  <div className="brand-item">Hourglass</div>
                  <div className="brand-item">Command+R</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar reveal" ref={statsRef}>
        <div className="container-custom">
          <div className="stat-item">
            <div className="stat-num"><span className="stat-num-val" data-target="50">0</span>+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-item">
            <div className="stat-num"><span className="stat-num-val" data-target="30">0</span>+</div>
            <div className="stat-label">Happy Clients</div>
          </div>
          <div className="stat-item">
            <div className="stat-num"><span className="stat-num-val" data-target="3">0</span>+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-num"><span className="stat-num-val" data-target="100">0</span>%</div>
            <div className="stat-label">Satisfaction</div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about">
        <div className="container-custom">
          <div className="about-grid">
            <div className="reveal">
              <div className="section-label">How We Work</div>
              <h2 className="about-title">Get a dedicated design team at a fraction of the cost.</h2>
            </div>
            <div className="about-right">
              <ScrubText
                text="Grow your brand with high-quality design for a flat monthly fee. Work with senior designers. Subscribe and make as many requests as you need — no limits."
                className="about-scrub"
              />
              <div className="reveal" style={{ marginTop: '30px' }}>
                <Link href="/contact" className="btn-primary" style={{ background: 'var(--accent)', color: '#000' }}>See Pricing</Link>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="process-grid" ref={processRef}>
            <div className="process-line"></div>
            <div className="process-step" style={{ opacity: 0 }}>
              <div className="process-icon"><Rocket size={28} /></div>
              <h3>Subscribe & get started</h3>
              <p>Submit as many design tasks as you need without worrying about individual project fees.</p>
            </div>
            <div className="process-step" style={{ opacity: 0 }}>
              <div className="process-icon"><Palette size={28} /></div>
              <h3>Polished designs - on time</h3>
              <p>Our designers get to work to deliver your request. Receive your design within a few days.</p>
            </div>
            <div className="process-step" style={{ opacity: 0 }}>
              <div className="process-icon"><RefreshCw size={28} /></div>
              <h3>Revisions made simple</h3>
              <p>Custom designs, prompt replies, and as many revisions as you need until it's perfect.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-section">
        <div className="container-custom">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <div className="section-label">Our Services</div>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-1.5px' }}>Everything Your Brand Needs</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '16px auto 0', fontSize: '0.95rem', lineHeight: '1.7' }}>
              Crafting websites, logos, and professional email setups tailored for your business.
            </p>
          </div>
          <div className="services-grid">
            <div className="svc-card" style={{ opacity: 0 }}>
              <div className="svc-icon"><MonitorPlay size={26} /></div>
              <h3>Web Design</h3>
              <p>Custom websites built to showcase your business with style, clarity, and ease of use.</p>
            </div>
            <div className="svc-card" style={{ opacity: 0 }}>
              <div className="svc-icon"><Mail size={26} /></div>
              <h3>Email Setup</h3>
              <p>Professional email accounts to keep your communication seamless and on-brand.</p>
            </div>
            <div className="svc-card" style={{ opacity: 0 }}>
              <div className="svc-icon"><PenTool size={26} /></div>
              <h3>Logo &amp; Branding</h3>
              <p>Distinctive logos and brand identities that tell your story and make you memorable.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }} className="reveal">
            <Link href="/services" className="btn-outline">
              View All Services
              <span className="arrow-circle">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="portfolio-preview">
        <div className="container-custom">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <div className="section-label">Featured Work</div>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-1.5px' }}>Projects Crafted With Care</h2>
          </div>

          <div className="portfolio-preview-grid">
            {/* Card 1 */}
            <Link href="/portfolio" className="portfolio-card" style={{ opacity: 0 }}>
              <div className="portfolio-card-thumb">
                <div className="card-visual">
                  <img src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=800&auto=format&fit=crop" alt="Dark moody sports car" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
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
            </Link>

            {/* Card 2 */}
            <Link href="/portfolio" className="portfolio-card" style={{ opacity: 0 }}>
              <div className="portfolio-card-thumb">
                <div className="card-visual">
                  <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop" alt="Elegant dark workspace" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
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
            </Link>

            {/* Card 3 */}
            <Link href="/portfolio" className="portfolio-card" style={{ opacity: 0 }}>
              <div className="portfolio-card-thumb">
                <div className="card-visual">
                  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop" alt="Laptop on dark desk" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
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
            </Link>
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }} className="reveal">
            <Link href="/portfolio" className="btn-outline">
              View All Projects
              <span className="arrow-circle">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="testimonials">
        <div className="container-custom">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <div className="section-label">Testimonials</div>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-1.5px' }}>What Our Clients Say</h2>
          </div>
          <div className="testimonials-grid">
            <div className="test-card" style={{ opacity: 0 }}>
              <div className="test-stars"><Star size={16} fill="var(--yellow)" color="var(--yellow)" /><Star size={16} fill="var(--yellow)" color="var(--yellow)" /><Star size={16} fill="var(--yellow)" color="var(--yellow)" /><Star size={16} fill="var(--yellow)" color="var(--yellow)" /><Star size={16} fill="var(--yellow)" color="var(--yellow)" /></div>
              <blockquote>"They transformed our brand with a stunning logo and exceptional website design services."</blockquote>
              <div className="test-author">
                <div className="test-avatar">EG</div>
                <div className="test-author-info"><h4>Dr. Eunice G.</h4><span>Business Owner</span></div>
              </div>
            </div>
            <div className="test-card" style={{ opacity: 0 }}>
              <div className="test-stars"><Star size={16} fill="var(--yellow)" color="var(--yellow)" /><Star size={16} fill="var(--yellow)" color="var(--yellow)" /><Star size={16} fill="var(--yellow)" color="var(--yellow)" /><Star size={16} fill="var(--yellow)" color="var(--yellow)" /><Star size={16} fill="var(--yellow)" color="var(--yellow)" /></div>
              <blockquote>"TUC Designs — they are swift, reliable and easy to work with. The end results was exactly what I was looking for."</blockquote>
              <div className="test-author">
                <div className="test-avatar">AC</div>
                <div className="test-author-info"><h4>Agi Chu</h4><span>Owner, Pump Foods LLC</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />

      {/* SVG Filter for Water Effect (Option A - Background Only) */}
      <svg style={{ width: 0, height: 0, position: 'absolute' }}>
        <filter id="water-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale="0" 
            xChannelSelector="R" 
            yChannelSelector="G" 
            className="water-displacement" 
          />
        </filter>
      </svg>
    </div>
  );
}
