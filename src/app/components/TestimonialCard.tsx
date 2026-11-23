import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import type { Testimonial } from '@/app/success-stories/data';

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="StarIcon"
          variant="solid"
          size={14}
          className={i < rating ? 'text-warning' : 'text-border'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { name, photo, quote, priorRole, newRole, company, companyLogo, rating, result } = testimonial;

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-7 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <StarRating rating={rating} />
        {result && (
          <span className="text-2xs font-700 text-accent uppercase tracking-wide px-2 py-1 rounded-full" style={{ background: 'rgba(37,99,235,0.08)' }}>
            {result}
          </span>
        )}
      </div>

      <p className="text-sm sm:text-base text-foreground leading-relaxed mb-6 flex-1">&ldquo;{quote}&rdquo;</p>

      <div className="flex items-center gap-3 pt-5 border-t border-border">
        {photo ? (
          <AppImage
            src={photo}
            alt={name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-700 text-accent"
            style={{ background: 'rgba(37,99,235,0.1)' }}
            aria-hidden="true"
          >
            {getInitials(name)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-700 text-foreground truncate">{name}</p>
          <p className="text-xs text-muted truncate">
            {priorRole} <Icon name="ArrowRightIcon" size={10} className="inline mx-0.5 -mt-0.5" aria-hidden="true" /> {newRole}
            {company ? ` · ${company}` : ''}
          </p>
        </div>
        {companyLogo && (
          <AppImage
            src={companyLogo}
            alt={company ? `${company} logo` : 'Company logo'}
            width={28}
            height={28}
            className="w-7 h-7 object-contain flex-shrink-0 opacity-80"
          />
        )}
      </div>
    </div>
  );
}
