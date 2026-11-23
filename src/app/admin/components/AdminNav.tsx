'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

const TABS = [
  { href: '/admin/candidates', label: 'Join / Candidate', icon: 'UserCircleIcon' },
  { href: '/admin/companies', label: 'Company / Hiring', icon: 'BuildingOfficeIcon' },
  { href: '/admin/contact', label: 'Contact', icon: 'EnvelopeIcon' },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))' }}>
              <span className="text-white font-800 text-xs">&gt;</span>
            </div>
            <span className="font-800 text-base text-foreground">ITtoAI Admin</span>
          </div>
          <button type="button" onClick={handleLogout} className="inline-flex items-center gap-1.5 text-sm font-600 text-muted hover:text-foreground transition-colors">
            <Icon name="ArrowRightStartOnRectangleIcon" size={16} aria-hidden="true" />
            Sign out
          </button>
        </div>
        <nav className="flex gap-1 -mb-px overflow-x-auto" aria-label="Admin sections">
          {TABS.map((tab) => {
            const active = pathname?.startsWith(tab.href);
            return (
              <a
                key={tab.href}
                href={tab.href}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-700 border-b-2 whitespace-nowrap transition-colors"
                style={active ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : { borderColor: 'transparent', color: 'var(--muted)' }}
              >
                <Icon name={tab.icon} size={16} aria-hidden="true" />
                {tab.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
