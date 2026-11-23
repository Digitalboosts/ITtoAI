import React from 'react';

export default function StatusBadge({ status }: { status: 'new' | 'reviewed' }) {
  const isNew = status === 'new';
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-2xs font-700 uppercase tracking-wider flex-shrink-0"
      style={
        isNew
          ? { background: 'rgba(37,99,235,0.1)', color: 'var(--accent)' }
          : { background: 'rgba(16,185,129,0.1)', color: 'var(--success)' }
      }
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'currentColor' }} aria-hidden="true" />
      {isNew ? 'New' : 'Reviewed'}
    </span>
  );
}
