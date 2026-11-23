import React from 'react';
import type { Metadata } from 'next';
import SubmissionsView from '../../components/SubmissionsView';

export const metadata: Metadata = {
  title: 'Company / Hiring Submissions | ITtoAI Admin',
  robots: { index: false, follow: false },
};

export default function AdminCompaniesPage() {
  return (
    <SubmissionsView
      title="Company / Hiring Submissions"
      description="Companies who submitted the “Hire AI Talent” form."
      endpoint="/api/companies"
    />
  );
}
