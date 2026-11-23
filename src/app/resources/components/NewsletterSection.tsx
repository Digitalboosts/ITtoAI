'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

type Status = 'idle' | 'loading' | 'success' | 'error';

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

async function subscribe(email: string): Promise<void> {
  // Placeholder for future newsletter provider integration — no backend exists yet.
  await new Promise((resolve) => setTimeout(resolve, 900));
  void email;
}

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Enter your email address.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Enter a valid email address.');
      return;
    }
    setError(null);
    setStatus('loading');
    try {
      await subscribe(email);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-20 lg:py-28 dark-section bg-dot-overlay" aria-labelledby="newsletter-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <span className="section-label-dark mb-5 inline-flex">Stay Informed</span>
          <h2 id="newsletter-heading" className="section-heading-clamp font-800 tracking-tight text-white leading-[1.1] mb-4">
            New guides, sent
            <br />
            <span className="text-gradient-primary">occasionally.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
            No noise, no spam — just new career and technical AI guides when they&apos;re published.
          </p>

          {status === 'success' ? (
            <div className="dark-card-bg rounded-2xl border p-6 flex items-center justify-center gap-3">
              <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0" variant="solid" aria-hidden="true" />
              <p className="text-sm sm:text-base font-600 text-white">Thanks — this is a demo. Sign-up isn&apos;t connected yet, so you haven&apos;t actually been subscribed.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 text-left">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="you@example.com"
                  disabled={status === 'loading'}
                  aria-invalid={!!error}
                  aria-describedby={error ? 'newsletter-error' : undefined}
                  className="w-full rounded-lg border px-4 py-3 text-sm text-white placeholder:text-slate-500 bg-white/5 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  style={{ borderColor: error ? '#EF4444' : 'rgba(255,255,255,0.15)' }}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary justify-center flex-shrink-0"
              >
                {status === 'loading' ? (
                  <>
                    <Icon name="ArrowPathIcon" size={16} className="animate-spin" aria-hidden="true" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          )}
          {error && status !== 'success' && (
            <p id="newsletter-error" className="text-xs text-red-400 mt-3">{error}</p>
          )}
          {status === 'error' && (
            <p className="text-xs text-red-400 mt-3">Something went wrong. Please try again.</p>
          )}

          <p className="text-xs text-slate-500 mt-5">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
