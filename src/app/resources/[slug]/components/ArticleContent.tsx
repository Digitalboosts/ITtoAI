import React from 'react';
import { ArticleSection } from '../../data';

export default function ArticleContent({ sections }: { sections: ArticleSection[] }) {
  return (
    <div
      className="prose prose-slate max-w-[720px]
        prose-headings:font-800 prose-headings:tracking-tight prose-headings:text-foreground
        prose-h2:text-2xl prose-h2:mt-0 prose-h2:mb-4 prose-h2:scroll-mt-24
        prose-p:text-foreground prose-p:leading-relaxed
        prose-strong:text-foreground
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
    >
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-24">
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </section>
      ))}
    </div>
  );
}
