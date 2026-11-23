import React from 'react';
import { ArticleSection } from '../../data';
import TableOfContents from './TableOfContents';
import ArticleContent from './ArticleContent';

export default function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <section className="pb-16 lg:pb-20 bg-white" aria-label="Article body">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-14">
          <TableOfContents sections={sections} />
          <ArticleContent sections={sections} />
        </div>
      </div>
    </section>
  );
}
