'use client';
import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { PROFILE_FIELDS, QUESTIONS } from '../lib/assessment-data';
import { useAssessment } from '../context/AssessmentContext';
import LeadCaptureModal from './LeadCaptureModal';

function ProfileStep() {
  const { profile, setProfileField, isProfileComplete, profileCompletedCount, beginQuiz } = useAssessment();

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8">
      <div className="flex items-center justify-between mb-2">
        <p className="text-2xs font-700 text-muted uppercase tracking-wider">Your Profile</p>
        <p className="text-2xs font-700 text-accent">{profileCompletedCount}/{PROFILE_FIELDS.length} completed</p>
      </div>
      <div className="progress-bar-bg mb-8">
        <div className="progress-bar-fill" style={{ width: `${(profileCompletedCount / PROFILE_FIELDS.length) * 100}%` }} />
      </div>

      <div className="space-y-8">
        {PROFILE_FIELDS.map((field) => (
          <div key={field.key}>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-700 text-foreground">{field.label}</p>
              {profile[field.key] && <Icon name="CheckCircleIcon" size={14} className="text-success" variant="solid" aria-hidden="true" />}
            </div>
            <p className="text-xs text-muted mb-3">{field.helper}</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label={field.label}>
              {field.options.map((option) => {
                const selected = profile[field.key] === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setProfileField(field.key, option)}
                    aria-pressed={selected}
                    className="px-4 py-2.5 rounded-full text-sm font-600 border transition-colors min-h-[40px]"
                    style={
                      selected
                        ? { background: 'var(--accent)', color: 'var(--accent-foreground)', borderColor: 'var(--accent)' }
                        : { background: 'var(--card)', color: 'var(--foreground)', borderColor: 'var(--border)' }
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

      <div className="w-full h-px bg-border my-8" aria-hidden="true" />

      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={beginQuiz}
          disabled={!isProfileComplete}
          className={isProfileComplete ? 'btn-primary w-full sm:w-auto justify-center' : 'btn-secondary w-full sm:w-auto justify-center opacity-50 cursor-not-allowed'}
        >
          Start My Assessment
          {isProfileComplete && <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />}
        </button>
        {!isProfileComplete && (
          <p className="text-xs text-muted-foreground text-center">Select an option in each field above to continue.</p>
        )}
      </div>
    </div>
  );
}

function QuizStep() {
  const { answers, currentQuestionIndex, answerCurrentQuestion, goToPreviousQuestion, goToNextQuestion, calculateResult } = useAssessment();
  const question = QUESTIONS[currentQuestionIndex];
  const total = QUESTIONS.length;
  const selectedOptionId = answers[question.id];
  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === total - 1;
  const progressPct = Math.round(((currentQuestionIndex + 1) / total) * 100);

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8">
      <div className="flex items-center justify-between mb-2">
        <p className="text-2xs font-700 text-muted uppercase tracking-wider">Question {currentQuestionIndex + 1} of {total}</p>
        <p className="text-2xs font-700 text-accent">{progressPct}%</p>
      </div>
      <div className="progress-bar-bg mb-8">
        <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <span className="skill-chip bg-secondary text-accent border-accent/20 mb-4 inline-flex">{question.category}</span>

      {question.scenario && (
        <p className="text-sm text-muted leading-relaxed mb-2">{question.scenario}</p>
      )}
      <h3 className="text-lg sm:text-xl font-700 text-foreground leading-snug mb-6">{question.prompt}</h3>

      <div className="space-y-3 mb-8" role="radiogroup" aria-label={question.prompt}>
        {question.options.map((option) => {
          const selected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => answerCurrentQuestion(option.id)}
              className="w-full text-left flex items-center gap-3 rounded-xl border px-4 py-3.5 min-h-[52px] transition-colors"
              style={
                selected
                  ? { background: 'rgba(37,99,235,0.06)', borderColor: 'var(--accent)' }
                  : { background: 'var(--card)', borderColor: 'var(--border)' }
              }
            >
              <span
                className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                style={{ borderColor: selected ? 'var(--accent)' : 'var(--border)' }}
                aria-hidden="true"
              >
                {selected && <span className="w-2.5 h-2.5 rounded-full bg-accent" />}
              </span>
              <span className="text-sm sm:text-base font-600 text-foreground">{option.label}</span>
            </button>
          );
        })}
      </div>

      <div className="w-full h-px bg-border mb-6" aria-hidden="true" />

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goToPreviousQuestion}
          disabled={isFirst}
          className={`btn-secondary ${isFirst ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          <Icon name="ArrowLeftIcon" size={16} aria-hidden="true" />
          Back
        </button>

        {isLast ? (
          <button type="button" onClick={calculateResult} disabled={!selectedOptionId} className={!selectedOptionId ? 'btn-primary opacity-50 cursor-not-allowed' : 'btn-primary'}>
            Calculate My AI Readiness
            <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
          </button>
        ) : (
          <button type="button" onClick={goToNextQuestion} disabled={!selectedOptionId} className={!selectedOptionId ? 'btn-primary opacity-50 cursor-not-allowed' : 'btn-primary'}>
            Next
            <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

function CompletedStep() {
  const { result, profile } = useAssessment();
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  const scrollToResult = () => {
    document.getElementById('result-preview')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8 text-center">
      <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(16,185,129,0.1)' }} aria-hidden="true">
        <Icon name="CheckCircleIcon" size={26} className="text-success" variant="solid" />
      </div>
      <h3 className="text-xl font-800 text-foreground mb-3">Assessment complete.</h3>
      <p className="text-sm sm:text-base text-muted leading-relaxed mb-6 max-w-md mx-auto">
        {result ? (
          <>Your AI Readiness Score is <span className="font-700 text-foreground">{result.overall} / 100</span>. Scroll down to see your full personalized result.</>
        ) : (
          'Scroll down to see your personalized result.'
        )}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={scrollToResult} className="btn-primary">
          View My Result
          <Icon name="ArrowDownIcon" size={16} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => setLeadModalOpen(true)} className="btn-secondary">
          I Want to Build My AI Career
        </button>
      </div>

      {result && (
        <LeadCaptureModal
          open={leadModalOpen}
          onClose={() => setLeadModalOpen(false)}
          defaults={{
            currentRole: profile.role ?? '',
            yearsExperience: profile.experience ?? '',
            targetRole: result.recommendedRole,
          }}
        />
      )}
    </div>
  );
}

export default function AssessmentOnboardingForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const { hydrated, step } = useAssessment();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-child').forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 60);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="begin" ref={sectionRef} className="py-20 lg:py-28 bg-white" aria-labelledby="begin-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-label mb-5 inline-flex reveal-child stagger-1">
            {step === 'quiz' ? 'Quick Assessment' : 'Before You Begin'}
          </span>
          <h2 id="begin-heading" className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5 reveal-child stagger-2">
            {step === 'quiz' ? (
              <>
                A few quick
                <br />
                <span className="text-gradient-primary">questions.</span>
              </>
            ) : (
              <>
                Tell us a little
                <br />
                <span className="text-gradient-primary">about where you are.</span>
              </>
            )}
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed reveal-child stagger-3">
            {step === 'quiz'
              ? 'Mostly multiple-choice and scenario-based — pick the best answer for each.'
              : 'A few quick details help ITtoAI personalize your assessment and results.'}
          </p>
        </div>

        <div className="max-w-2xl mx-auto reveal-child stagger-4">
          {!hydrated ? (
            <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8 h-64 animate-pulse" aria-hidden="true" />
          ) : step === 'profile' ? (
            <ProfileStep />
          ) : step === 'quiz' ? (
            <QuizStep />
          ) : (
            <CompletedStep />
          )}
        </div>
      </div>
    </section>
  );
}
