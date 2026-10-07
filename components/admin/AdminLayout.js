'use client';

import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  LayoutDashboard,
  Package,
  Users,
  LogOut,
  Home,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { brandTitle } from '@/lib/brand';
import { isAdminRole } from '@/lib/roles';

const nav = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/admin/orders', label: 'Orders', icon: Package },
  { href: '/admin/users', label: 'Users', icon: Users },
];

export default function AdminLayout({ children, title = 'Admin Dashboard' }) {
  const router = useRouter();
  const { user, loading, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!isLoggedIn) {
      router.replace(`/login?returnUrl=${encodeURIComponent(router.asPath)}`);
      return;
    }
    if (!isAdminRole(user?.role)) {
      router.replace('/profile');
    }
  }, [loading, isLoggedIn, user, router]);

  if (loading || !isLoggedIn || !isAdminRole(user?.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center font-quicksand bg-slate-100">
        <p className="font-bold text-gray-600">Verifying admin access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-quicksand bg-slate-100 text-gray-900">
      <Head>
        <title>{brandTitle(title)}</title>
      </Head>

      <div className="flex min-h-screen">
        <aside className="w-64 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white flex flex-col shrink-0">
          <div className="p-6 border-b border-white/10">
            <Link href="/admin" className="font-montserrat font-black text-xl">
              <span className="text-[#00875A]">Ace</span> Wave Net
            </Link>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Admin Panel</p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = item.exact
                ? router.pathname === item.href
                : router.pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
                    active ? 'bg-[#00875A] text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10 space-y-2">
            <p className="text-xs text-gray-400 px-2 truncate">{user?.email}</p>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-300 hover:text-white"
            >
              <Home className="w-4 h-4" /> View site
            </Link>
            <button
              type="button"
              onClick={() => {
                logout();
                router.push('/login');
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-300 hover:text-white w-full"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-auto">
          <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
            <div>
              <p className="text-[10px] font-black text-[#00875A] uppercase tracking-widest">Admin</p>
              <h1 className="font-montserrat text-2xl font-black text-gray-900">{title}</h1>
            </div>
            <span className="text-sm font-bold text-gray-500">Signed in as {user?.name}</span>
          </header>
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function AdminBreadcrumb({ items }) {
  return (
    <div className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-6">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 && <ChevronRight className="w-4 h-4" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-[#00875A]">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
