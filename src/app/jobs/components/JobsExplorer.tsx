'use client';
import React, { useMemo, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import JobCard from './JobCard';
import { jobs, isMatchedSkill } from '../data';

type FilterKey = 'experience' | 'workMode' | 'technology' | 'aiSpecialization' | 'location' | 'salary' | 'jobType';

const filterGroups: { key: FilterKey; label: string; icon: string; options: string[] }[] = [
  { key: 'experience', label: 'Experience', icon: 'AcademicCapIcon', options: ['All', 'Entry-level', 'Mid-level', 'Senior', 'Lead'] },
  { key: 'workMode', label: 'Remote / Hybrid / On-site', icon: 'HomeIcon', options: ['All', 'Remote', 'Hybrid', 'On-site'] },
  { key: 'technology', label: 'Technology', icon: 'CodeBracketIcon', options: ['All', 'Python', 'Java', '.NET', 'JavaScript', 'Cloud', 'Other'] },
  { key: 'aiSpecialization', label: 'AI Specialization', icon: 'CpuChipIcon', options: ['All', 'LLM Engineering', 'RAG', 'AI Agents', 'MLOps', 'AI Evaluation', 'AI Product'] },
  { key: 'location', label: 'Location', icon: 'MapPinIcon', options: ['All', 'Remote', 'Bengaluru', 'London', 'New York', 'Singapore'] },
  { key: 'salary', label: 'Salary', icon: 'CurrencyDollarIcon', options: ['All', '$60k–90k', '$90k–120k', '$120k–150k', '$150k+'] },
  { key: 'jobType', label: 'Job Type', icon: 'ClockIcon', options: ['All', 'Full-time', 'Contract', 'Internship'] },
];

const emptyFilters: Record<FilterKey, string> = {
  experience: 'All',
  workMode: 'All',
  technology: 'All',
  aiSpecialization: 'All',
  location: 'All',
  salary: 'All',
  jobType: 'All',
};

export default function JobsExplorer() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<FilterKey, string>>(emptyFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const jobsWithMatch = useMemo(
    () =>
      jobs.map((job) => ({
        ...job,
        matchedSkills: job.requiredSkills.filter(isMatchedSkill),
        missingSkills: job.requiredSkills.filter((s) => !isMatchedSkill(s)),
      })),
    []
  );

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();
    return jobsWithMatch.filter((job) => {
      const matchesSearch =
        query === '' ||
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.requiredSkills.some((s) => s.toLowerCase().includes(query));

      const matchesFilters = (Object.keys(filters) as FilterKey[]).every(
        (key) => filters[key] === 'All' || job[key] === filters[key]
      );

      return matchesSearch && matchesFilters;
    });
  }, [jobsWithMatch, search, filters]);

  const activeFilterCount = Object.values(filters).filter((v) => v !== 'All').length;

  const setFilter = (key: FilterKey, value: string) => setFilters((prev) => ({ ...prev, [key]: value }));

  const clearAll = () => {
    setSearch('');
    setFilters(emptyFilters);
  };

  return (
    <section id="explore" className="pb-20 lg:pb-28" aria-labelledby="explore-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="explore-heading" className="sr-only">Search and filter AI jobs</h2>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
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
              placeholder="Search by role, skill, company or location..."
              aria-label="Search jobs by role, skill, company or location"
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

        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="btn-secondary w-full justify-center"
            aria-expanded={filtersOpen}
          >
            <Icon name="AdjustmentsHorizontalIcon" size={16} aria-hidden="true" />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Filters sidebar */}
          <aside className={`${filtersOpen ? 'block' : 'hidden'} lg:block`} aria-label="Job filters">
            <div className="bg-card rounded-2xl border border-border p-5 lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm font-800 text-foreground">Filters</p>
                {activeFilterCount > 0 && (
                  <button type="button" onClick={clearAll} className="text-xs font-700 text-accent hover:underline">
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {filterGroups.map((group) => (
                  <div key={group.key}>
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <Icon name={group.icon} size={14} className="text-muted-foreground" aria-hidden="true" />
                      <p className="text-xs font-700 text-foreground">{group.label}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5" role="group" aria-label={group.label}>
                      {group.options.map((option) => {
                        const selected = filters[group.key] === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setFilter(group.key, option)}
                            aria-pressed={selected}
                            className="px-3 py-1.5 rounded-full text-xs font-600 border transition-colors"
                            style={
                              selected
                                ? { background: 'var(--accent)', color: 'var(--accent-foreground)', borderColor: 'var(--accent)' }
                                : { background: 'var(--secondary)', color: 'var(--foreground)', borderColor: 'var(--border)' }
                            }
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Results */}
          <div>
            <p className="text-sm text-muted mb-5">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </p>

            {filteredJobs.length === 0 ? (
              <div className="text-center py-16 px-6 bg-secondary rounded-xl border border-dashed border-border">
                <p className="text-base font-700 text-foreground mb-2">No matching jobs</p>
                <p className="text-sm text-muted mb-5">Try a different search term or adjust your filters.</p>
                <button type="button" onClick={clearAll} className="btn-secondary">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Closing cross-link */}
        <div className="text-center mt-16">
          <p className="text-sm text-muted mb-4">Want to know exactly where you stand before applying?</p>
          <a href="/assessment#begin" className="btn-secondary">
            Check My AI Readiness
            <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
