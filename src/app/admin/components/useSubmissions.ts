'use client';
import { useCallback, useEffect, useState } from 'react';

export interface SubmissionRecord {
  _id: string;
  status: 'new' | 'reviewed';
  createdAt: string;
  [key: string]: unknown;
}

export function useSubmissions(endpoint: string) {
  const [data, setData] = useState<SubmissionRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(endpoint);
      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      if (!res.ok) throw new Error('Failed to load submissions.');
      const body = await res.json();
      setData(body.submissions);
    } catch {
      setError('Failed to load submissions.');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updateStatus = async (id: string, status: 'new' | 'reviewed') => {
    setData((prev) => (prev ? prev.map((r) => (r._id === id ? { ...r, status } : r)) : prev));
    await fetch(`${endpoint}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  };

  const remove = async (id: string) => {
    setData((prev) => (prev ? prev.filter((r) => r._id !== id) : prev));
    await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
  };

  return { data, error, loading, refresh, updateStatus, remove };
}
