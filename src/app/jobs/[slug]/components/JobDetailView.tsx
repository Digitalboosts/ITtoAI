'use client';
import React, { useState } from 'react';
import { JobListing } from '../../data';
import JobDetailHeader from './JobDetailHeader';
import YourMatchSection from './YourMatchSection';
import JobDetailsSection from './JobDetailsSection';
import InterviewProcessSection from './InterviewProcessSection';

export default function JobDetailView({ job }: { job: JobListing }) {
  const [saved, setSaved] = useState(false);
  const toggleSave = () => setSaved((v) => !v);

  return (
    <>
      <JobDetailHeader job={job} saved={saved} onToggleSave={toggleSave} />
      <YourMatchSection job={job} />
      <JobDetailsSection job={job} />
      <InterviewProcessSection job={job} saved={saved} onToggleSave={toggleSave} />
    </>
  );
}
