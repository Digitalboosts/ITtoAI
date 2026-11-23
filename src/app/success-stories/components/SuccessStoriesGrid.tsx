'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import TestimonialCard from '@/app/components/TestimonialCard';
import { testimonials } from '../data';

export default function SuccessStoriesGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-child').forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 60);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="pb-20 lg:pb-28" aria-labelledby="stories-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="stories-heading" className="sr-only">Placement success stories</h2>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 reveal-child stagger-1">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        ) : (
          <div className="max-w-xl mx-auto text-center py-16 px-6 bg-secondary rounded-2xl border border-dashed border-border reveal-child stagger-1">
            <Icon name="UserGroupIcon" size={28} className="text-muted-foreground mx-auto mb-4" aria-hidden="true" />
            <p className="text-base font-700 text-foreground mb-2">Stories are on their way</p>
            <p className="text-sm text-muted leading-relaxed">
              We&apos;re verifying placement details with each professional before publishing their story here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
