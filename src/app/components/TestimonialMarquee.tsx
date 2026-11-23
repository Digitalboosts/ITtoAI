import React from 'react';
import TestimonialCard from './TestimonialCard';
import type { Testimonial } from '@/app/success-stories/data';

export default function TestimonialMarquee({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  // Duplicated so the track can loop seamlessly at -50%.
  const track = [...testimonials, ...testimonials];

  return (
    <div className="marquee-mask">
      <div className="marquee-track flex gap-5" role="list" aria-label="More testimonials">
        {track.map((testimonial, i) => (
          <div key={`${testimonial.id}-${i}`} className="w-[300px] sm:w-[340px] flex-shrink-0" role="listitem">
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
    </div>
  );
}
