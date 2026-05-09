'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mail, Phone, MapPin } from 'lucide-react';
import GridOverlay from '@/components/GridOverlay';
import HeroBlobs from '@/components/HeroBlobs';
import './ContactClient.css';

export default function ContactClient() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-desc', {
        y: 30, opacity: 0, duration: 1, delay: 0.4, ease: 'power3.out'
      });

      gsap.fromTo('.contact-info', 
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' }
      );

      gsap.fromTo('.contact-form-card', 
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' }
      );
      
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Message sent successfully! (This is a demo form)');
    e.currentTarget.reset();
  };

  return (
    <div ref={heroRef}>
      {/* Hero Section */}
      <section className="hero hero-sub" id="contact-hero">
        <GridOverlay />
        <HeroBlobs 
          style1={{ background: 'radial-gradient(circle, rgba(74,222,128,0.2), transparent)' }} 
          style2={{ background: 'radial-gradient(circle, rgba(163,230,53,0.15), transparent)' }} 
        />
        <div className="container-custom">
          <div className="hero-content">
            <div>
              <div className="section-label">Get In Touch</div>
              <h1 id="heroHeadline" style={{ marginBottom: '20px' }}>Let's Build Something Meaningful Together.</h1>
              <p className="hero-desc">Ready to elevate your online presence? Fill out the form below or reach out to us directly. We'd love to hear about your project and see how we can help.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container-custom">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Contact Information</h2>
              <p style={{ color:'var(--text-muted)', lineHeight: '1.7' }}>Whether you have a question, want to start a project, or just want to say hi, we'll try our best to get back to you within 24 hours.</p>
              
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="icon"><Mail size={24} /></div>
                  <div>
                    <h4>Email Us</h4>
                    <p><a href="mailto:info@tucdesigns.com">info@tucdesigns.com</a></p>
                  </div>
                </div>
                
                <div className="contact-info-item">
                  <div className="icon"><Phone size={24} /></div>
                  <div>
                    <h4>Call Us</h4>
                    <p><a href="tel:+14243128525">+1 424-312-8525</a></p>
                  </div>
                </div>
                
                <div className="contact-info-item">
                  <div className="icon"><MapPin size={24} /></div>
                  <div>
                    <h4>Location</h4>
                    <p>Available worldwide.<br/>Based in the United States.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="contact-form-card">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" className="form-control" placeholder="John Doe" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" className="form-control" placeholder="john@example.com" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="service">Service Interested In</label>
                  <select id="service" className="form-control" required defaultValue="">
                    <option value="" disabled>Select a service...</option>
                    <option value="web-design">Web Design</option>
                    <option value="email-setup">Email Setup</option>
                    <option value="branding">Logo &amp; Branding</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Project Details</label>
                  <textarea id="message" className="form-control" placeholder="Tell us about your project, goals, and timeline..." required></textarea>
                </div>
                
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', background: 'var(--accent)', color: '#000' }}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
