import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { ArticleSection } from '../../data';

export default function TableOfContents({ sections }: { sections: ArticleSection[] }) {
  return (
    <nav aria-label="Table of contents" className="lg:sticky lg:top-24">
      <div className="bg-secondary rounded-xl border border-border p-5">
        <div className="flex items-center gap-1.5 mb-4">
          <Icon name="ListBulletIcon" size={15} className="text-accent" aria-hidden="true" />
          <p className="text-xs font-800 text-foreground uppercase tracking-wider">In This Article</p>
        </div>
        <ol className="space-y-2.5">
          {sections.map((section, i) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="flex items-start gap-2 text-sm text-muted hover:text-accent transition-colors leading-snug"
              >
                <span className="text-2xs font-700 text-muted-foreground mt-0.5">{i + 1}.</span>
                {section.heading}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
