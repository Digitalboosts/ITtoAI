'use client';
import React, { useMemo, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useSubmissions, SubmissionRecord } from './useSubmissions';
import StatusBadge from './StatusBadge';
import { humanizeKey, formatDate } from './humanize';

const META_KEYS = new Set(['_id', 'status', 'createdAt']);

function getDisplayName(record: SubmissionRecord): string {
  return (record.fullName as string) || (record.name as string) || 'Unknown';
}

function getDisplayEmail(record: SubmissionRecord): string {
  return (record.email as string) || (record.workEmail as string) || '';
}

interface Props {
  title: string;
  description: string;
  endpoint: string;
}

export default function SubmissionsView({ title, description, endpoint }: Props) {
  const { data, error, loading, updateStatus, remove } = useSubmissions(endpoint);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'new' | 'reviewed'>('all');
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!data) return [];
    if (filter === 'all') return data;
    return data.filter((r) => r.status === filter);
  }, [data, filter]);

  const newCount = data?.filter((r) => r.status === 'new').length ?? 0;

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div>
          <h1 className="text-xl font-800 text-foreground mb-1">{title}</h1>
          <p className="text-sm text-muted">{description}</p>
        </div>
        <div className="flex gap-2" role="group" aria-label="Filter by status">
          {(['all', 'new', 'reviewed'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className="px-3.5 py-2 rounded-full text-sm font-600 border transition-colors"
              style={
                filter === f
                  ? { background: 'var(--accent)', color: 'var(--accent-foreground)', borderColor: 'var(--accent)' }
                  : { background: 'var(--card)', color: 'var(--foreground)', borderColor: 'var(--border)' }
              }
            >
              {f === 'all' ? 'All' : f === 'new' ? `New${newCount ? ` (${newCount})` : ''}` : 'Reviewed'}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-5 h-20 animate-pulse" aria-hidden="true" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="bg-card rounded-xl border border-border p-8 text-center">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="bg-card rounded-xl border border-border p-10 text-center">
          <p className="text-sm text-muted">
            {filter === 'all' ? 'No submissions yet.' : `No ${filter} submissions.`}
          </p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <ul className="space-y-3">
          {filtered.map((record) => {
            const isExpanded = expandedId === record._id;
            const displayName = getDisplayName(record);
            const displayEmail = getDisplayEmail(record);
            const detailEntries = Object.entries(record).filter(([key]) => !META_KEYS.has(key));

            return (
              <li key={record._id} className="bg-card rounded-xl border border-border overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : record._id)}
                  className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left hover:bg-secondary transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap mb-1">
                      <p className="text-sm font-700 text-foreground truncate">{displayName}</p>
                      <StatusBadge status={record.status} />
                    </div>
                    <p className="text-xs text-muted truncate">
                      {displayEmail}
                      {displayEmail && ' · '}
                      {formatDate(record.createdAt)}
                    </p>
                  </div>
                  <Icon
                    name="ChevronDownIcon"
                    size={18}
                    className="text-muted-foreground flex-shrink-0 transition-transform"
                    style={{ transform: isExpanded ? 'rotate(180deg)' : 'none' }}
                    aria-hidden="true"
                  />
                </button>

                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 border-t border-border pt-4">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-5">
                      {detailEntries.map(([key, value]) => (
                        <div key={key} className={key === 'message' ? 'sm:col-span-2' : undefined}>
                          <dt className="text-2xs font-700 text-muted-foreground uppercase tracking-wider mb-0.5">{humanizeKey(key)}</dt>
                          <dd className="text-sm text-foreground break-words">{(value as string) || '—'}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateStatus(record._id, record.status === 'new' ? 'reviewed' : 'new')}
                        className="btn-secondary text-sm py-2 px-3.5"
                      >
                        {record.status === 'new' ? (
                          <>
                            <Icon name="CheckCircleIcon" size={15} aria-hidden="true" />
                            Mark as Reviewed
                          </>
                        ) : (
                          <>
                            <Icon name="ArrowUturnLeftIcon" size={15} aria-hidden="true" />
                            Mark as New
                          </>
                        )}
                      </button>

                      {pendingDeleteId === record._id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Delete this submission?</span>
                          <button
                            type="button"
                            onClick={() => {
                              remove(record._id);
                              setPendingDeleteId(null);
                            }}
                            className="text-sm font-700 text-red-500 hover:text-red-600"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={() => setPendingDeleteId(null)}
                            className="text-sm font-600 text-muted-foreground hover:text-foreground"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPendingDeleteId(record._id)}
                          className="inline-flex items-center gap-1.5 text-sm font-600 text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <Icon name="TrashIcon" size={15} aria-hidden="true" />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
