import React from 'react';
import { Resource } from '../../data';
import ResourceCard from '../../components/ResourceCard';

export default function RelatedResourcesSection({ related }: { related: Resource[] }) {
  if (related.length === 0) return null;

  return (
    <section className="py-16 lg:py-20 bg-secondary" aria-labelledby="related-heading">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <p id="related-heading" className="label-text text-accent mb-6">Related Resources</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {related.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
}
