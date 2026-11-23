'use client';
import React, { useMemo, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import ResourceCard from './ResourceCard';
import { resources, categories, featuredId, latestIds, popularIds } from '../data';

const featured = resources.find((r) => r.id === featuredId)!;
const latest = latestIds.map((id) => resources.find((r) => r.id === id)!);
const popular = popularIds.map((id) => resources.find((r) => r.id === id)!);

export default function ResourcesExplorer() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach((cat) => {
      counts[cat] = resources.filter((r) => r.category === cat).length;
    });
    return counts;
  }, []);

  const isFiltering = search.trim() !== '' || activeCategory !== 'All';

  const filteredResources = useMemo(() => {
    const query = search.trim().toLowerCase();
    return resources.filter((r) => {
      const matchesCategory = activeCategory === 'All' || r.category === activeCategory;
      const matchesSearch =
        query === '' ||
        r.title.toLowerCase().includes(query) ||
        r.excerpt.toLowerCase().includes(query) ||
        r.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const clearFilters = () => {
    setSearch('');
    setActiveCategory('All');
  };

  return (
    <section id="explore" className="py-16 lg:py-20 bg-secondary" aria-labelledby="explore-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="explore-heading" className="sr-only">Browse resources</h2>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Icon
              name="MagnifyingGlassIcon"
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guides and articles..."
              aria-label="Search resources"
              className="w-full rounded-full border border-border bg-card pl-11 pr-11 py-3.5 text-sm text-foreground placeholder:text-muted-foreground shadow-card focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-muted hover:bg-secondary transition-colors"
              >
                <Icon name="XMarkIcon" size={14} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-14" role="group" aria-label="Filter by category">
          <button
            type="button"
            onClick={() => setActiveCategory('All')}
            aria-pressed={activeCategory === 'All'}
            className="px-4 py-2 rounded-full text-sm font-600 border transition-colors"
            style={
              activeCategory === 'All'
                ? { background: 'var(--accent)', color: 'var(--accent-foreground)', borderColor: 'var(--accent)' }
                : { background: 'var(--card)', color: 'var(--foreground)', borderColor: 'var(--border)' }
            }
          >
            All <span className="opacity-70">({resources.length})</span>
          </button>
          {categories.map((cat) => {
            const selected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={selected}
                className="px-4 py-2 rounded-full text-sm font-600 border transition-colors"
                style={
                  selected
                    ? { background: 'var(--accent)', color: 'var(--accent-foreground)', borderColor: 'var(--accent)' }
                    : { background: 'var(--card)', color: 'var(--foreground)', borderColor: 'var(--border)' }
                }
              >
                {cat} <span className="opacity-70">({categoryCounts[cat]})</span>
              </button>
            );
          })}
        </div>

        {isFiltering ? (
          <div>
            <p className="text-sm text-muted mb-6">
              Showing {filteredResources.length} of {resources.length} resources
            </p>
            {filteredResources.length === 0 ? (
              <div className="text-center py-16 px-6 bg-card rounded-xl border border-dashed border-border">
                <p className="text-base font-700 text-foreground mb-2">No matching resources</p>
                <p className="text-sm text-muted mb-5">Try a different search term or category.</p>
                <button type="button" onClick={clearFilters} className="btn-secondary">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Featured resource */}
            <div className="mb-14">
              <p className="label-text text-accent mb-4">Featured</p>
              <article className="relative bg-card rounded-2xl border border-border shadow-card overflow-hidden card-hover">
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
                  <div
                    className="flex items-center justify-center p-10 lg:p-0"
                    style={{ background: 'linear-gradient(135deg, #1B3A6B 0%, #2563EB 60%, #6366F1 100%)' }}
                    aria-hidden="true"
                  >
                    <Icon name={featured.categoryIcon} size={48} className="text-white/90" />
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 text-2xs font-700 text-accent uppercase tracking-wider">
                        <Icon name={featured.categoryIcon} size={13} aria-hidden="true" />
                        {featured.category}
                      </span>
                      <span
                        className="text-2xs font-700 px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: 'rgba(99,102,241,0.08)', color: 'var(--accent-secondary)', border: '1px solid rgba(99,102,241,0.2)' }}
                      >
                        {featured.format}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-800 text-foreground leading-snug mb-3">
                      <a href={`/resources/${featured.id}`} className="after:absolute after:inset-0">
                        {featured.title}
                      </a>
                    </h3>
                    <p className="text-sm sm:text-base text-muted leading-relaxed mb-6 max-w-xl">{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs font-600 text-muted-foreground">
                      <span>{featured.author} &middot; 2026</span>
                      <span>{featured.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* Latest resources */}
            <div className="mb-14">
              <p className="label-text text-accent mb-4">Latest Resources</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {latest.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </div>

            {/* Popular resources */}
            <div>
              <p className="label-text text-accent mb-4">Popular Resources</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {popular.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
