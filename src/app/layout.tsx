import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import LenisProvider from '@/components/LenisProvider';

export const metadata: Metadata = {
  title: 'TUC Designs | Premium Web Design & Branding',
  description: 'Crafting tailored websites, professional email setups, and memorable logos to help your business stand out online.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
