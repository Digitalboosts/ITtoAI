'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import FeaturedTestimonialCarousel from './FeaturedTestimonialCarousel';
import TestimonialMarquee from './TestimonialMarquee';
import { testimonials } from '@/app/success-stories/data';

export default function SocialProofSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-child').forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="social-proof"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white overflow-hidden"
      aria-labelledby="social-proof-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">Stories</span>
          <h2
            id="social-proof-heading"
            className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] reveal-child stagger-2"
          >
            From IT professionals
            <br />
            <span className="text-gradient-primary">who made the shift.</span>
          </h2>
        </div>

        {testimonials.length > 0 ? (
          <div className="reveal-child stagger-3">
            <FeaturedTestimonialCarousel testimonials={testimonials} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 reveal-child stagger-3 max-w-5xl mx-auto">
            {[0, 1, 2]?.map((i) => (
              <div
                key={i}
                className="bg-secondary rounded-xl border border-dashed border-border p-8 flex flex-col items-center justify-center text-center min-h-[200px]"
                aria-label="Testimonial placeholder"
              >
                <div
                  className="w-12 h-12 rounded-full mb-4 flex items-center justify-center"
                  style={{ background: 'rgba(37,99,235,0.06)', border: '1.5px dashed rgba(37,99,235,0.2)' }}
                  aria-hidden="true"
                >
                  <span className="text-accent text-xl font-300 leading-none">&ldquo;</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Real stories from ITtoAI professionals and employers will appear here.
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {testimonials.length > 0 && (
        <>
          <div className="mt-14 reveal-child stagger-4">
            <TestimonialMarquee testimonials={testimonials} />
          </div>
          <div className="text-center mt-10 reveal-child stagger-5">
            <a href="/success-stories" className="btn-secondary">
              View All Success Stories
              <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
            </a>
          </div>
        </>
      )}
    </section>
  );
}
