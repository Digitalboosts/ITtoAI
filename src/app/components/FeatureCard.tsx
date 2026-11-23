import React from 'react';
import Icon from '@/components/ui/AppIcon';

export interface FeatureCardData {
  icon: string;
  title: string;
  description: string;
}

interface FeatureCardProps {
  feature: FeatureCardData;
  className?: string;
}

export default function FeatureCard({ feature, className = '' }: FeatureCardProps) {
  return (
    <article
      className={`bg-card rounded-xl border border-border p-6 card-hover ${className}`}
      aria-label={feature.title}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
        style={{ background: 'rgba(37,99,235,0.08)' }}
        aria-hidden="true"
      >
        <Icon name={feature.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-accent" />
      </div>
      <h3 className="text-base font-700 text-foreground mb-2.5">{feature.title}</h3>
      <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
    </article>
  );
}