'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || 'Incorrect password.');
        setLoading(false);
        return;
      }
      router.push('/admin/candidates');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-accent to-accent-secondary" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))' }}>
            <span className="text-white font-800 text-sm">&gt;</span>
          </div>
          <span className="font-800 text-lg text-foreground">ITtoAI Admin</span>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8">
          <h1 className="text-lg font-800 text-foreground mb-1.5">Admin sign in</h1>
          <p className="text-sm text-muted mb-6">Enter the admin password to view form submissions.</p>

          <label htmlFor="admin-password" className="block text-sm font-700 text-foreground mb-1.5">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40"
            style={{ borderColor: error ? '#EF4444' : 'var(--border)' }}
          />
          {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}

          <button type="submit" disabled={loading || !password} className="btn-primary w-full justify-center mt-6" >
            {loading ? (
              <>
                <Icon name="ArrowPathIcon" size={16} className="animate-spin" aria-hidden="true" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
