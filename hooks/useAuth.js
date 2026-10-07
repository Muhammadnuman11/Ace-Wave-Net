'use client';

import { useState, useEffect, useCallback } from 'react';
import { getToken, getUser, clearAuth, authHeaders } from '@/lib/authClient';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const token = getToken();
    const cached = getUser();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    if (cached) setUser(cached);
    try {
      const res = await fetch('/api/auth/me', { headers: authHeaders() });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        clearAuth();
        setUser(null);
      }
    } catch {
      setUser(cached);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const onAuthChange = () => refresh();
    window.addEventListener('auth-change', onAuthChange);
    return () => window.removeEventListener('auth-change', onAuthChange);
  }, [refresh]);

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return {
    user,
    loading,
    isLoggedIn: Boolean(user),
    isAdmin,
    logout,
    refresh,
  };
}
