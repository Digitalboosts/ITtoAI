'use client';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/components/ui/AppIcon';
import type { CompanyInput } from '@/lib/validation';

type HireTalentLeadValues = CompanyInput;
type FormStatus = 'idle' | 'loading' | 'success' | 'error';
type FormErrors = Partial<Record<keyof HireTalentLeadValues, string>>;

const COMPANY_SIZE_OPTIONS = ['1–10', '11–50', '51–200', '201–1,000', '1,000+'];
const HIRING_FOR_OPTIONS = [
  'AI Engineer',
  'GenAI Engineer',
  'AI Application Engineer',
  'AI QA Engineer',
  'MLOps Engineer',
  'AI/Data Engineer',
  'AI Business Analyst',
  'AI Product Manager',
  'Multiple roles',
  'Not sure yet',
];
const TIMELINE_OPTIONS = ['Immediate need', 'Within 1–3 months', 'Exploring / planning ahead', 'Ongoing pipeline'];

const inputBaseClass =
  'w-full rounded-lg border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40';

const emptyValues: HireTalentLeadValues = {
  fullName: '',
  workEmail: '',
  phone: '',
  companyName: '',
  companySize: '',
  hiringFor: '',
  timeline: '',
  message: '',
};

function validate(values: HireTalentLeadValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Please enter your full name.';
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = 'Name looks too short.';
  }

  if (!values.workEmail.trim()) {
    errors.workEmail = 'Please enter your work email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.workEmail.trim())) {
    errors.workEmail = 'Enter a valid email address.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Please enter a phone number.';
  } else if (!/^[0-9+\-\s()]{7,20}$/.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number.';
  }

  if (!values.companyName.trim()) errors.companyName = 'Please enter your company name.';
  if (!values.companySize) errors.companySize = 'Select a company size.';
  if (!values.hiringFor) errors.hiringFor = 'Select what you’re hiring for.';
  if (!values.timeline) errors.timeline = 'Select a hiring timeline.';

  return errors;
}

async function submitHireTalentLead(values: HireTalentLeadValues): Promise<void> {
  const res = await fetch('/api/companies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  if (!res.ok) throw new Error('Failed to submit');
}

interface ChipFieldProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function ChipField({ label, options, value, onChange, error }: ChipFieldProps) {
  return (
    <div>
      <p className="text-sm font-700 text-foreground mb-2">
        {label} <span className="text-red-500">*</span>
      </p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={selected}
              className="px-3.5 py-2 rounded-full text-sm font-600 border transition-colors min-h-[40px]"
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
      <p className="text-xs text-red-500 mt-1.5 min-h-[1rem]">{error}</p>
    </div>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function HireTalentModal({ open, onClose }: Props) {
  const [values, setValues] = useState<HireTalentLeadValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof HireTalentLeadValues, boolean>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setValues(emptyValues);
      setErrors({});
      setTouched({});
      setStatus('idle');
      setTimeout(() => nameInputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const setField = <K extends keyof HireTalentLeadValues>(key: K, value: HireTalentLeadValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleBlur = (key: keyof HireTalentLeadValues) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validate(values));
  };

  const fieldError = (key: keyof HireTalentLeadValues) => (touched[key] ? errors[key] : undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched({
      fullName: true,
      workEmail: true,
      phone: true,
      companyName: true,
      companySize: true,
      hiringFor: true,
      timeline: true,
    });
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('loading');
    try {
      await submitHireTalentLead(values);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(11,22,40,0.6)' }}
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="hire-talent-modal-heading"
        className="bg-card rounded-2xl border border-border shadow-card w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-muted hover:text-foreground hover:bg-secondary transition-colors"
        >
          <Icon name="XMarkIcon" size={20} aria-hidden="true" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(16,185,129,0.1)' }} aria-hidden="true">
              <Icon name="CheckCircleIcon" size={26} className="text-success" variant="solid" />
            </div>
            <h3 className="text-xl font-800 text-foreground mb-3">Thanks — we&apos;ve got your details.</h3>
            <p className="text-sm sm:text-base text-muted leading-relaxed mb-6 max-w-sm mx-auto">
              Our team will follow up with verified, AI-ready candidates that match your hiring need.
            </p>
            <button type="button" onClick={onClose} className="btn-primary">
              Close
            </button>
          </div>
        ) : status === 'error' ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(239,68,68,0.1)' }} aria-hidden="true">
              <Icon name="ExclamationTriangleIcon" size={24} className="text-red-500" />
            </div>
            <h3 className="text-xl font-800 text-foreground mb-3">Something went wrong.</h3>
            <p className="text-sm sm:text-base text-muted leading-relaxed mb-6 max-w-sm mx-auto">
              We couldn&apos;t submit your details. Your entries are still here — please try again.
            </p>
            <button type="button" onClick={() => setStatus('idle')} className="btn-primary">
              Try again
              <Icon name="ArrowPathIcon" size={16} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <>
            <p className="section-label mb-4 inline-flex">Hire AI Talent</p>
            <h2 id="hire-talent-modal-heading" className="text-xl sm:text-2xl font-800 tracking-tight text-foreground leading-snug mb-2">
              Tell us who you&apos;re looking for.
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-6">
              Share a few details about your hiring need and we&apos;ll follow up with verified, AI-ready candidates.
            </p>

            <form onSubmit={handleSubmit} noValidate aria-busy={status === 'loading'}>
              <fieldset disabled={status === 'loading'} className="space-y-6">
                <legend className="sr-only">Hire AI Talent form</legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="hire-fullName" className="block text-sm font-700 text-foreground mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      id="hire-fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      value={values.fullName}
                      onChange={(e) => setField('fullName', e.target.value)}
                      onBlur={() => handleBlur('fullName')}
                      placeholder="Jane Doe"
                      aria-invalid={!!fieldError('fullName')}
                      aria-describedby={fieldError('fullName') ? 'hire-fullName-error' : undefined}
                      className={inputBaseClass}
                      style={{ borderColor: fieldError('fullName') ? '#EF4444' : 'var(--border)' }}
                    />
                    <p id="hire-fullName-error" className="text-xs text-red-500 mt-1.5 min-h-[1rem]">{fieldError('fullName')}</p>
                  </div>

                  <div>
                    <label htmlFor="hire-workEmail" className="block text-sm font-700 text-foreground mb-1.5">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="hire-workEmail"
                      name="workEmail"
                      type="email"
                      autoComplete="email"
                      value={values.workEmail}
                      onChange={(e) => setField('workEmail', e.target.value)}
                      onBlur={() => handleBlur('workEmail')}
                      placeholder="you@company.com"
                      aria-invalid={!!fieldError('workEmail')}
                      aria-describedby={fieldError('workEmail') ? 'hire-workEmail-error' : undefined}
                      className={inputBaseClass}
                      style={{ borderColor: fieldError('workEmail') ? '#EF4444' : 'var(--border)' }}
                    />
                    <p id="hire-workEmail-error" className="text-xs text-red-500 mt-1.5 min-h-[1rem]">{fieldError('workEmail')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="hire-phone" className="block text-sm font-700 text-foreground mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="hire-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(e) => setField('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      placeholder="+1 555 123 4567"
                      aria-invalid={!!fieldError('phone')}
                      aria-describedby={fieldError('phone') ? 'hire-phone-error' : undefined}
                      className={inputBaseClass}
                      style={{ borderColor: fieldError('phone') ? '#EF4444' : 'var(--border)' }}
                    />
                    <p id="hire-phone-error" className="text-xs text-red-500 mt-1.5 min-h-[1rem]">{fieldError('phone')}</p>
                  </div>

                  <div>
                    <label htmlFor="hire-companyName" className="block text-sm font-700 text-foreground mb-1.5">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="hire-companyName"
                      name="companyName"
                      type="text"
                      autoComplete="organization"
                      value={values.companyName}
                      onChange={(e) => setField('companyName', e.target.value)}
                      onBlur={() => handleBlur('companyName')}
                      placeholder="Acme Inc."
                      aria-invalid={!!fieldError('companyName')}
                      aria-describedby={fieldError('companyName') ? 'hire-companyName-error' : undefined}
                      className={inputBaseClass}
                      style={{ borderColor: fieldError('companyName') ? '#EF4444' : 'var(--border)' }}
                    />
                    <p id="hire-companyName-error" className="text-xs text-red-500 mt-1.5 min-h-[1rem]">{fieldError('companyName')}</p>
                  </div>
                </div>

                <ChipField label="Company Size" options={COMPANY_SIZE_OPTIONS} value={values.companySize} onChange={(v) => setField('companySize', v)} error={fieldError('companySize')} />
                <ChipField label="Hiring For" options={HIRING_FOR_OPTIONS} value={values.hiringFor} onChange={(v) => setField('hiringFor', v)} error={fieldError('hiringFor')} />
                <ChipField label="Hiring Timeline" options={TIMELINE_OPTIONS} value={values.timeline} onChange={(v) => setField('timeline', v)} error={fieldError('timeline')} />

                <div>
                  <label htmlFor="hire-message" className="block text-sm font-700 text-foreground mb-1.5">
                    Message <span className="text-muted-foreground font-500">(optional)</span>
                  </label>
                  <textarea
                    id="hire-message"
                    name="message"
                    rows={3}
                    value={values.message}
                    onChange={(e) => setField('message', e.target.value)}
                    placeholder="Anything specific about the role or team?"
                    className={`${inputBaseClass} resize-none`}
                    style={{ borderColor: 'var(--border)' }}
                  />
                </div>

                <button type="submit" className="btn-primary w-full sm:w-auto justify-center" disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <>
                      <Icon name="ArrowPathIcon" size={16} className="animate-spin" aria-hidden="true" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit
                      <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
                    </>
                  )}
                </button>
              </fieldset>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
