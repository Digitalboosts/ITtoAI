import React from 'react';
import AppLogo from '@/components/ui/AppLogo';

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/it_to_ai/',
    icon: (
      <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true">
        <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.5.5.9 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.76 4.9 4.9 0 0 1-1.76 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.76-1.15 4.9 4.9 0 0 1-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76a4.9 4.9 0 0 1 1.76-1.15c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.87.04-1.34.18-1.65.3-.42.16-.71.35-1.02.66-.31.31-.5.6-.66 1.02-.12.31-.26.78-.3 1.65C4.28 8.54 4.27 8.86 4.27 12s.01 3.46.06 4.51c.04.87.18 1.34.3 1.65.16.42.35.71.66 1.02.31.31.6.5 1.02.66.31.12.78.26 1.65.3 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.87-.04 1.34-.18 1.65-.3.42-.16.71-.35 1.02-.66.31-.31.5-.6.66-1.02.12-.31.26-.78.3-1.65.05-1.05.06-1.37.06-4.51s-.01-3.46-.06-4.51c-.04-.87-.18-1.34-.3-1.65a2.75 2.75 0 0 0-.66-1.02 2.75 2.75 0 0 0-1.02-.66c-.31-.12-.78-.26-1.65-.3C14.99 3.81 14.67 3.8 12 3.8Zm0 3.05a5.15 5.15 0 1 1 0 10.3 5.15 5.15 0 0 1 0-10.3Zm0 1.8a3.35 3.35 0 1 0 0 6.7 3.35 3.35 0 0 0 0-6.7Zm5.35-1.99a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919341171960',
    icon: (
      <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24a8.24 8.24 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.26-8.24Zm-4.53 4.3c-.17 0-.44.06-.67.32-.23.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.12.16 1.74 2.78 4.29 3.79.6.24 1.06.38 1.43.48.6.16 1.15.14 1.58.09.48-.07 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.07-.1-.24-.16-.5-.29-.26-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.56.13-.17.25-.65.81-.79.98-.15.16-.29.18-.55.06-.26-.13-1.08-.4-2.06-1.28-.76-.68-1.28-1.51-1.42-1.77-.15-.25-.02-.39.11-.51.11-.11.26-.29.38-.44.13-.14.17-.25.26-.41.08-.16.04-.31-.02-.44-.06-.13-.56-1.37-.78-1.87-.2-.49-.41-.42-.56-.43l-.48-.01Z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61593504479366',
    icon: (
      <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true">
        <path d="M13.5 21.5v-8.2h2.75l.41-3.2h-3.16V8.05c0-.93.26-1.56 1.59-1.56h1.7V3.62A22.7 22.7 0 0 0 14.31 3.5c-2.44 0-4.11 1.49-4.11 4.22v2.35H7.44v3.2h2.76v8.2h3.3Z" />
      </svg>
    ),
  },
];

const footerLinks = {
  Platform: [
    { label: 'AI Assessment', href: '/assessment' },
    { label: 'Career Paths', href: '/career' },
    { label: 'Programs', href: '/programs' },
    { label: 'AI Jobs', href: '/jobs' },
    { label: 'AI Talent', href: '/companies' },
  ],
  Professionals: [
    { label: 'AI Readiness', href: '/assessment' },
    { label: 'Skill Gaps', href: '/career' },
    { label: 'Projects', href: '/professionals#practical-development' },
    { label: 'Verified Profile', href: '/professionals#profile' },
  ],
  Companies: [
    { label: 'Hire AI Talent', href: '/companies' },
    { label: 'Talent Search', href: '/companies' },
    { label: 'Workforce Transformation', href: '/companies#enterprise' },
  ],
  Resources: [
    { label: 'AI Career Guides', href: '/resources' },
    { label: 'AI Skills', href: '/resources' },
    { label: 'Technical Resources', href: '/resources' },
    { label: 'Success Stories', href: '/success-stories' },
    { label: 'FAQ', href: '/faq' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-16 pb-8" role="contentinfo">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-3" aria-label="ITtoAI">
              <AppLogo size={28} />
              <span className="font-display font-800 text-lg tracking-tight text-foreground">ITtoAI</span>
            </a>
            <p className="text-sm text-muted leading-relaxed max-w-[200px] mb-4">
              Transform your IT career for the AI era.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks?.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-muted hover:text-foreground hover:bg-secondary transition-colors border border-border"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks)?.map(([group, links]) => (
            <div key={group}>
              <h3 className="label-text text-foreground mb-4">{group}</h3>
              <ul className="space-y-2.5">
                {links?.map((link) => (
                  <li key={link?.label}>
                    <a
                      href={link?.href}
                      className="text-sm font-500 text-muted hover:text-foreground transition-colors focus:outline-none focus:text-accent"
                    >
                      {link?.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2026 ITtoAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-sm font-500 text-muted hover:text-foreground transition-colors">Privacy</a>
            <a href="/terms" className="text-sm font-500 text-muted hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}