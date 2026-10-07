'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { Phone, User, LogOut, LayoutDashboard } from 'lucide-react';
import Logo from '@/components/Logo';
import { BRAND } from '@/lib/brand';
import { navLinks } from '@/lib/siteData';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const router = useRouter();
  const { user, isLoggedIn, isAdmin, logout } = useAuth();

  const scrollToZip = () => {
    if (router.pathname === '/') {
      document.getElementById('hero-zip-search')?.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('zip-input')?.focus();
    } else {
      router.push('/#hero-zip-search');
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-card border-b-0 border-white/40">
      <div className="flex justify-between items-center py-4 px-4 lg:px-20">
        <Logo />

        <nav className="hidden lg:flex space-x-4 text-gray-800 font-bold text-xs uppercase tracking-wide">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#00875A] transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-3 lg:space-x-6">
          <a href={BRAND.phoneTel} className="hidden lg:flex flex-col items-end">
            <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider">Prefer to talk?</span>
            <span className="flex items-center text-[#00875A] font-extrabold text-lg">
              <Phone className="w-4 h-4 mr-1" />
              {BRAND.phone}
            </span>
          </a>

          {isLoggedIn ? (
            <>
              {isAdmin ? (
                <Link
                  href="/admin"
                  className="hidden sm:flex items-center text-teal-800 font-bold text-sm hover:text-[#00875A]"
                >
                  <LayoutDashboard className="w-4 h-4 mr-1" />
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/profile"
                  className="hidden sm:flex items-center text-teal-800 font-bold text-sm hover:text-[#00875A]"
                >
                  <User className="w-4 h-4 mr-1" />
                  {user?.name?.split(' ')[0]}
                </Link>
              )}
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push('/');
                }}
                className="hidden sm:flex items-center text-gray-600 font-bold text-sm hover:text-gray-900"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <Link href="/login" className="hidden sm:block text-teal-800 font-bold text-sm hover:text-[#00875A]">
              Sign in
            </Link>
          )}

          <button
            type="button"
            onClick={scrollToZip}
            className="bg-gradient-to-r from-[#FFD100] to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-gray-900 font-bold p-3 rounded-2xl shadow-lg shadow-yellow-500/30 text-xs transition-all transform hover:scale-105"
          >
            Check Availability
          </button>
        </div>
      </div>
    </header>
  );
}
