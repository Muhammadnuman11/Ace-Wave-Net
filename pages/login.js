import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { setAuth } from '@/lib/authClient';

export default function Login() {
  const router = useRouter();
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (router.query.registered === '1') {
      setSuccess('Account created successfully. Please sign in.');
    }
  }, [router.query.registered]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      setAuth({ token: data.token, user: data.user });
      let dest = typeof router.query.returnUrl === 'string' ? router.query.returnUrl : '/';
      if (data.user?.role === 'admin') {
        dest = dest.startsWith('/admin') ? dest : '/admin';
      } else if (dest.startsWith('/admin')) {
        dest = '/profile';
      } else if (dest === '/') {
        dest = '/profile';
      }
      router.push(dest);
    } catch {
      setError('Unable to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | Ace Wave Net</title>
      </Head>
      <div className="font-quicksand min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#f0fdf4] to-[#ffedd5] flex items-center justify-center px-4 py-12">
        <div className="glass-card w-full max-w-md p-8 rounded-[2rem] border border-white/60 shadow-xl">
          <Link href="/" className="font-montserrat font-extrabold text-2xl tracking-tighter flex items-baseline justify-center mb-8">
            <span className="text-[#00875A]">Ace</span>
            <span className="text-gray-900"> Wave</span>
            <span className="text-teal-500">Net</span>
          </Link>

          <h1 className="font-montserrat text-3xl font-black text-gray-900 text-center mb-2">Welcome back</h1>
          <p className="text-gray-600 text-center font-medium mb-8">Sign in to your account</p>

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-semibold">
              {success}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full glass-card px-4 py-3 rounded-xl border border-white/60 outline-none focus:ring-2 focus:ring-teal-500 font-medium text-gray-800"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full glass-card px-4 py-3 rounded-xl border border-white/60 outline-none focus:ring-2 focus:ring-teal-500 font-medium text-gray-800"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#00875A] to-teal-500 hover:from-teal-600 hover:to-teal-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-500/30 transition-all disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="text-center text-gray-600 font-medium mt-8">
            Don&apos;t have an account?{' '}
            <Link
              href={
                router.query.returnUrl
                  ? `/register?returnUrl=${encodeURIComponent(router.query.returnUrl)}`
                  : '/register'
              }
              className="text-[#00875A] font-bold hover:underline"
            >
              Register
            </Link>
          </p>
          <p className="text-center mt-4">
            <Link href="/" className="text-sm text-gray-500 font-bold hover:text-teal-700">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
