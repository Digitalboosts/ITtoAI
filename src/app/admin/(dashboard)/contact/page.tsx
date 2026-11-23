import React from 'react';
import type { Metadata } from 'next';
import SubmissionsView from '../../components/SubmissionsView';

export const metadata: Metadata = {
  title: 'Contact Submissions | ITtoAI Admin',
  robots: { index: false, follow: false },
};

export default function AdminContactPage() {
  return (
    <SubmissionsView
      title="Contact Submissions"
      description="General enquiries submitted via the Contact page."
      endpoint="/api/contact"
    />
  );
}
