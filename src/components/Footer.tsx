import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-custom">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo"><span>TUC</span> Designs</Link>
            <p>Crafting tailored websites, professional email setups, and memorable logos to help your business stand out online.</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><FaFacebook size={18} /></a>
              <a href="#" aria-label="Twitter"><FaTwitter size={18} /></a>
              <a href="#" aria-label="Instagram"><FaInstagram size={18} /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="footer-links">
              <li><a href="mailto:info@tucdesigns.com">info@tucdesigns.com</a></li>
              <li><a href="tel:+14243128525">+1 424-312-8525</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()}. All rights reserved. The Uplift Chronicles / TUC Designs LLC.</p>
          <p>Crafted with care.</p>
        </div>
      </div>
    </footer>
  );
}
