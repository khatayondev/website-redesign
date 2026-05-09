'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon } from 'lucide-react';
import Magnetic from './Magnetic';
import './Navbar.css';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-custom flex justify-between items-center w-full">
        <Magnetic>
          <div style={{ display: 'inline-block' }}>
            <Link href="/" className="logo" onClick={closeMenu}>
              <span>TUC</span> Designs
            </Link>
          </div>
        </Magnetic>
        
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Magnetic>
            <li style={{ display: 'inline-block' }}><Link href="/" onClick={closeMenu} className={pathname === '/' ? 'active' : ''}>Home</Link></li>
          </Magnetic>
          <Magnetic>
            <li style={{ display: 'inline-block' }}><Link href="/services" onClick={closeMenu} className={pathname === '/services' ? 'active' : ''}>Services</Link></li>
          </Magnetic>
          <Magnetic>
            <li style={{ display: 'inline-block' }}><Link href="/portfolio" onClick={closeMenu} className={pathname === '/portfolio' ? 'active' : ''}>Portfolio</Link></li>
          </Magnetic>
          <Magnetic>
            <li style={{ display: 'inline-block' }}><Link href="/contact" onClick={closeMenu} className={pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
          </Magnetic>
        </ul>
        
        <div className="nav-right">
          <Magnetic>
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              aria-label="Switch Theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </Magnetic>
          <Magnetic>
            <div style={{ display: 'inline-block' }}>
              <Link href="/contact" className="nav-cta" onClick={closeMenu}>
                Get started
              </Link>
            </div>
          </Magnetic>
        </div>
        
        <button 
          className={`hamburger ${menuOpen ? 'active' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
