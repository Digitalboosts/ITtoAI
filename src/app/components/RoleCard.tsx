import React from 'react';
import Icon from '@/components/ui/AppIcon';

export interface RoleCardData {
  role: string;
  direction: string;
  icon: string;
}

interface RoleCardProps {
  roleData: RoleCardData;
}

export default function RoleCard({ roleData }: RoleCardProps) {
  return (
    <article
      className="bg-card rounded-xl border border-border p-5 card-hover"
      aria-label={`${roleData.role} to ${roleData.direction}`}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
        style={{ background: 'rgba(37,99,235,0.08)' }}
        aria-hidden="true"
      >
        <Icon name={roleData.icon as Parameters<typeof Icon>[0]['name']} size={18} className="text-accent" />
      </div>
      <h3 className="text-sm font-700 text-foreground mb-1">{roleData.role}</h3>
      <div className="flex items-center gap-1.5">
        <Icon name="ArrowRightIcon" size={11} className="text-accent" aria-hidden="true" />
        <p className="text-xs font-600 text-accent">{roleData.direction}</p>
      </div>
    </article>
  );
}