const fs = require('fs');
const path = require('path');

const markup = fs.readFileSync(path.join(__dirname, '../components/HomeMarkup.jsx'), 'utf8');

const header = `'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { initHomePage } from '@/lib/homePageInit';

export default function HomePage() {
  useEffect(() => {
    const boot = () => {
      if (typeof window !== 'undefined' && window.lucide) {
        initHomePage();
      }
    };
    boot();
    const timer = setInterval(() => {
      if (window.lucide) {
        clearInterval(timer);
        boot();
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Script
        src="https://unpkg.com/lucide@latest"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.lucide) {
            window.lucide.createIcons();
            initHomePage();
          }
        }}
      />
      <div className="font-quicksand text-gray-900 bg-gradient-to-br from-[#e0f2fe] via-[#f0fdf4] to-[#ffedd5] animate-bg min-h-screen relative overflow-x-hidden selection:bg-teal-500 selection:text-white">
`;

const footer = `
      </div>
    </>
  );
}
`;

fs.writeFileSync(path.join(__dirname, '../components/HomePage.js'), header + markup + footer);
console.log('HomePage.js created');
