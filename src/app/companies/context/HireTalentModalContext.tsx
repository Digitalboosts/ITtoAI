'use client';
import React, { createContext, useContext, useMemo, useState } from 'react';
import HireTalentModal from '../components/HireTalentModal';

interface HireTalentModalContextValue {
  openModal: () => void;
}

const HireTalentModalContext = createContext<HireTalentModalContextValue | null>(null);

export function HireTalentModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ openModal: () => setOpen(true) }), []);

  return (
    <HireTalentModalContext.Provider value={value}>
      {children}
      <HireTalentModal open={open} onClose={() => setOpen(false)} />
    </HireTalentModalContext.Provider>
  );
}

// Safe to call from components shared across pages (e.g. EmployerPipeline,
// also rendered on Home) — returns null outside a provider instead of
// throwing, so callers can fall back to normal navigation.
export function useHireTalentModalOptional(): HireTalentModalContextValue | null {
  return useContext(HireTalentModalContext);
}
