import React from 'react';
import type { Metadata } from 'next';
import SubmissionsView from '../../components/SubmissionsView';

export const metadata: Metadata = {
  title: 'Join / Candidate Submissions | ITtoAI Admin',
  robots: { index: false, follow: false },
};

export default function AdminCandidatesPage() {
  return (
    <SubmissionsView
      title="Join / Candidate Submissions"
      description="People who submitted the “I Want to Build My AI Career” form."
      endpoint="/api/candidates"
    />
  );
}
