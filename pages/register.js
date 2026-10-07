import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { setAuth } from '@/lib/authClient';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
        return;
      }

      if (data.token) {
        setAuth({ token: data.token, user: data.user });
        const dest = typeof router.query.returnUrl === 'string' ? router.query.returnUrl : '/profile';
        router.push(dest);
      } else {
        router.push('/login?registered=1');
      }
    } catch {
      setError('Unable to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Register | Ace Wave Net</title>
      </Head>
      <div className="font-quicksand min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#f0fdf4] to-[#ffedd5] flex items-center justify-center px-4 py-12">
        <div className="glass-card w-full max-w-md p-8 rounded-[2rem] border border-white/60 shadow-xl">
          <Link href="/" className="font-montserrat font-extrabold text-2xl tracking-tighter flex items-baseline justify-center mb-8">
            <span className="text-[#00875A]">Ace</span>
            <span className="text-gray-900"> Wave</span>
            <span className="text-teal-500">Net</span>
          </Link>

          <h1 className="font-montserrat text-3xl font-black text-gray-900 text-center mb-2">Create account</h1>
          <p className="text-gray-600 text-center font-medium mb-8">
            Register to purchase internet plans on Ace Wave Net
          </p>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full glass-card px-4 py-3 rounded-xl border border-white/60 outline-none focus:ring-2 focus:ring-teal-500 font-medium text-gray-800"
                placeholder="John Doe"
              />
            </div>
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
                placeholder="Min. 6 characters"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full glass-card px-4 py-3 rounded-xl border border-white/60 outline-none focus:ring-2 focus:ring-teal-500 font-medium text-gray-800"
                placeholder="Repeat password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#00875A] to-teal-500 hover:from-teal-600 hover:to-teal-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-500/30 transition-all disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="text-center text-gray-600 font-medium mt-8">
            Already have an account?{' '}
            <Link
              href={
                router.query.returnUrl
                  ? `/login?returnUrl=${encodeURIComponent(router.query.returnUrl)}`
                  : '/login'
              }
              className="text-[#00875A] font-bold hover:underline"
            >
              Sign in
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
