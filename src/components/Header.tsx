'use client';
import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

interface NavLink {
  label: string;
  href: string;
  icon: string;
  description: string;
}

interface NavPromo {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
}

interface NavGroup {
  label: string;
  icon: string;
  items: NavLink[];
  promo?: NavPromo;
}

type NavEntry = NavLink | NavGroup;

function isGroup(entry: NavEntry): entry is NavGroup {
  return 'items' in entry;
}

const navEntries: NavEntry[] = [
  {
    label: 'For Professionals',
    icon: 'UserGroupIcon',
    items: [
      { label: 'Overview', href: '/professionals', icon: 'UserCircleIcon', description: 'How ITtoAI works for you' },
      { label: 'AI Assessment', href: '/assessment', icon: 'ChartBarIcon', description: 'Score your AI readiness' },
      { label: 'Career Paths', href: '/career', icon: 'ArrowTrendingUpIcon', description: 'Map your route into AI' },
      { label: 'Programs', href: '/programs', icon: 'AcademicCapIcon', description: 'Structured, practical training' },
      { label: 'Jobs', href: '/jobs', icon: 'BriefcaseIcon', description: 'Open AI-track roles' },
    ],
    promo: {
      title: 'Not sure where you stand?',
      description: 'Take the free assessment — score, gaps and a recommended direction in minutes.',
      href: '/assessment#begin',
      ctaLabel: 'Check My AI Readiness',
    },
  },
  { label: 'Companies', href: '/companies', icon: 'BuildingOfficeIcon', description: '' },
  {
    label: 'Resources',
    icon: 'Squares2X2Icon',
    items: [
      { label: 'Resource Library', href: '/resources', icon: 'BookOpenIcon', description: 'Guides and technical reads' },
      { label: 'Success Stories', href: '/success-stories', icon: 'SparklesIcon', description: 'Real placements, real people' },
      { label: 'FAQ', href: '/faq', icon: 'QuestionMarkCircleIcon', description: 'Common questions, answered' },
      { label: 'About Us', href: '/about', icon: 'InformationCircleIcon', description: 'What ITtoAI is building' },
    ],
  },
];

function isEntryActive(entry: NavEntry, pathname: string): boolean {
  if (isGroup(entry)) return entry.items.some((item) => isEntryActive(item, pathname));
  if (entry.href === '/') return pathname === '/';
  return pathname === entry.href || pathname.startsWith(`${entry.href}/`);
}

function DesktopDropdown({
  group,
  open,
  active,
  onToggle,
  onClose,
  pathname,
}: {
  group: NavGroup;
  open: boolean;
  active: boolean;
  onToggle: () => void;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center gap-1.5 pl-3 pr-2.5 py-2 text-sm font-600 rounded-full border transition-colors whitespace-nowrap ${
          active || open
            ? 'text-accent bg-accent/10 border-accent/20'
            : 'text-muted border-transparent hover:text-foreground hover:bg-secondary'
        }`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Icon name={group.icon} size={16} aria-hidden="true" />
        {group.label}
        <Icon
          name="ChevronDownIcon"
          size={14}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <div
        className={`absolute top-full left-0 mt-2 w-[340px] bg-white rounded-2xl border border-border shadow-lg z-50 origin-top transition-all duration-200 ${
          open ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
        }`}
        role="menu"
      >
        <div className="p-2">
          {group.items.map((item) => {
            const itemActive = isEntryActive(item, pathname);
            return (
              <a
                key={item.label}
                href={item.href}
                role="menuitem"
                onClick={onClose}
                className={`group flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  itemActive ? 'bg-secondary' : 'hover:bg-secondary'
                }`}
              >
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ background: itemActive ? 'rgba(37,99,235,0.14)' : 'rgba(37,99,235,0.08)' }}
                  aria-hidden="true"
                >
                  <Icon name={item.icon} size={17} className="text-accent" />
                </span>
                <span className="min-w-0">
                  <span className={`flex items-center gap-1.5 text-sm font-700 ${itemActive ? 'text-accent' : 'text-foreground'}`}>
                    {item.label}
                    <Icon
                      name="ArrowRightIcon"
                      size={12}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="block text-xs text-muted mt-0.5 truncate">{item.description}</span>
                </span>
              </a>
            );
          })}
        </div>
        {group.promo && (
          <a
            href={group.promo.href}
            onClick={onClose}
            className="block m-2 mt-0 p-4 rounded-xl transition-transform hover:scale-[1.01]"
            style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(99,102,241,0.08))' }}
          >
            <p className="text-sm font-700 text-foreground mb-1">{group.promo.title}</p>
            <p className="text-xs text-muted leading-relaxed mb-2.5">{group.promo.description}</p>
            <span className="inline-flex items-center gap-1 text-xs font-700 text-accent">
              {group.promo.ctaLabel}
              <Icon name="ArrowRightIcon" size={12} aria-hidden="true" />
            </span>
          </a>
        )}
      </div>
    </div>
  );
}

function MobileGroup({
  group,
  open,
  active,
  onToggle,
  onNavigate,
  pathname,
}: {
  group: NavGroup;
  open: boolean;
  active: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  pathname: string;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-4 py-3.5 text-base font-600 transition-colors rounded-lg hover:bg-secondary min-h-[44px] ${
          active ? 'text-accent' : 'text-foreground'
        }`}
        aria-expanded={open}
      >
        {group.label}
        <Icon
          name="ChevronDownIcon"
          size={16}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="flex flex-col pl-4 border-l border-border ml-4 mb-1">
            {group.items.map((item) => {
              const itemActive = isEntryActive(item, pathname);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={onNavigate}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-secondary min-h-[44px] transition-colors ${
                    itemActive ? 'text-accent' : 'text-muted'
                  }`}
                >
                  <span
                    className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(37,99,235,0.08)' }}
                    aria-hidden="true"
                  >
                    <Icon name={item.icon} size={14} className="text-accent" />
                  </span>
                  <span className="text-sm font-500">{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname() || '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!openDesktopMenu) return;
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDesktopMenu(null);
      }
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDesktopMenu(null);
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, [openDesktopMenu]);

  const handleNavClick = () => {
    setMobileOpen(false);
    setOpenMobileGroup(null);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-blur ${
          scrolled
            ? 'bg-white/90 border-b border-border shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
        role="banner"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 flex-shrink-0 group" aria-label="ITtoAI Home">
            <span className="transition-transform duration-300 group-hover:scale-110">
              <AppLogo size={32} />
            </span>
            <span className="font-display font-800 text-xl tracking-tight text-foreground">
              ITtoAI
            </span>
          </a>

          {/* Desktop Nav */}
          <nav ref={navRef} className="hidden xl:flex items-center gap-0.5" aria-label="Primary navigation">
            {navEntries?.map((entry) => {
              const active = isEntryActive(entry, pathname);
              return isGroup(entry) ? (
                <DesktopDropdown
                  key={entry.label}
                  group={entry}
                  open={openDesktopMenu === entry.label}
                  active={active}
                  onToggle={() => setOpenDesktopMenu(openDesktopMenu === entry.label ? null : entry.label)}
                  onClose={() => setOpenDesktopMenu(null)}
                  pathname={pathname}
                />
              ) : (
                <a
                  key={entry.label}
                  href={entry.href}
                  className={`flex items-center gap-1.5 pl-3 pr-3 py-2 text-sm font-600 rounded-full border transition-colors whitespace-nowrap ${
                    active
                      ? 'text-accent bg-accent/10 border-accent/20'
                      : 'text-muted border-transparent hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon name={entry.icon} size={16} aria-hidden="true" />
                  {entry.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden xl:flex items-center gap-2">
            <a
              href="/contact"
              className="btn-secondary text-sm py-2 px-3.5"
            >
              Contact Us
            </a>
            <a
              href="/assessment#begin"
              className="btn-primary text-sm py-2 px-3.5"
            >
              Check My AI Readiness
            </a>
          </div>

          {/* Mobile Actions + Hamburger */}
          <div className="flex xl:hidden items-center gap-1.5 flex-shrink-0">
            <a
              href="/contact"
              aria-label="Contact Us"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-foreground hover:bg-secondary transition-colors flex-shrink-0"
            >
              <Icon name="EnvelopeIcon" size={16} aria-hidden="true" />
            </a>
            <a
              href="/assessment#begin"
              className="btn-primary text-xs py-1.5 px-2.5 whitespace-nowrap"
            >
              AI Readiness
            </a>
            <button
              className="flex flex-col gap-1.5 p-2 rounded-md hover:bg-secondary transition-colors flex-shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
                  mobileOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
                  mobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
                  mobileOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`fixed inset-0 z-40 nav-blur bg-white/95 transition-all duration-300 xl:hidden flex flex-col ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col h-full pt-24 px-6 pb-8 overflow-y-auto">
          <nav className="flex flex-col gap-1 mb-8" aria-label="Mobile navigation">
            {navEntries?.map((entry) => {
              const active = isEntryActive(entry, pathname);
              return isGroup(entry) ? (
                <MobileGroup
                  key={entry.label}
                  group={entry}
                  open={openMobileGroup === entry.label}
                  active={active}
                  onToggle={() => setOpenMobileGroup(openMobileGroup === entry.label ? null : entry.label)}
                  onNavigate={handleNavClick}
                  pathname={pathname}
                />
              ) : (
                <a
                  key={entry.label}
                  href={entry.href}
                  onClick={handleNavClick}
                  className={`px-4 py-3.5 text-base font-600 transition-colors rounded-lg hover:bg-secondary min-h-[44px] flex items-center ${
                    active ? 'text-accent' : 'text-foreground'
                  }`}
                >
                  {entry.label}
                </a>
              );
            })}
          </nav>
          <div className="flex flex-col gap-3 mt-auto">
            <a
              href="/contact"
              onClick={handleNavClick}
              className="btn-secondary w-full justify-center text-base py-3.5"
            >
              Contact Us
            </a>
            <a
              href="/assessment#begin"
              onClick={handleNavClick}
              className="btn-primary w-full justify-center text-base py-3.5"
            >
              Check My AI Readiness
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
