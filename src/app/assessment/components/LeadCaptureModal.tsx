'use client';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/components/ui/AppIcon';
import { PROFILE_FIELDS } from '../lib/assessment-data';
import type { CandidateInput } from '@/lib/validation';

type CareerLeadValues = CandidateInput;
type FormStatus = 'idle' | 'loading' | 'success' | 'error';
type FormErrors = Partial<Record<keyof CareerLeadValues, string>>;

const LEARNING_PREFERENCES = ['1:1 Mentorship', 'Structured Program', 'Self-Paced Learning', 'Job / Placement Support', 'Not sure yet'];

const ROLE_OPTIONS = PROFILE_FIELDS.find((f) => f.key === 'role')?.options ?? [];
const EXPERIENCE_OPTIONS = PROFILE_FIELDS.find((f) => f.key === 'experience')?.options ?? [];
const TARGET_ROLE_OPTIONS = PROFILE_FIELDS.find((f) => f.key === 'targetRole')?.options ?? [];

const inputBaseClass =
  'w-full rounded-lg border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40';

function validate(values: CareerLeadValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Please enter your full name.';
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = 'Name looks too short.';
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Please enter your phone number.';
  } else if (!/^[0-9+\-\s()]{7,20}$/.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number.';
  }

  if (!values.currentRole) errors.currentRole = 'Select your current role.';
  if (!values.yearsExperience) errors.yearsExperience = 'Select your years of experience.';
  if (!values.targetRole) errors.targetRole = 'Select a target AI role.';
  if (!values.learningPreference) errors.learningPreference = 'Select a preference.';

  return errors;
}

async function submitLead(values: CareerLeadValues): Promise<void> {
  const res = await fetch('/api/candidates', {
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
  defaults: { currentRole: string; yearsExperience: string; targetRole: string };
}

export default function LeadCaptureModal({ open, onClose, defaults }: Props) {
  const emptyValues: CareerLeadValues = {
    fullName: '',
    email: '',
    phone: '',
    currentRole: defaults.currentRole,
    yearsExperience: defaults.yearsExperience,
    targetRole: defaults.targetRole,
    learningPreference: '',
    message: '',
  };

  const [values, setValues] = useState<CareerLeadValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof CareerLeadValues, boolean>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Portals need a real document.body, which only exists client-side.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset to fresh (prefilled) values each time the modal opens.
  useEffect(() => {
    if (open) {
      setValues({
        fullName: '',
        email: '',
        phone: '',
        currentRole: defaults.currentRole,
        yearsExperience: defaults.yearsExperience,
        targetRole: defaults.targetRole,
        learningPreference: '',
        message: '',
      });
      setErrors({});
      setTouched({});
      setStatus('idle');
      setTimeout(() => nameInputRef.current?.focus(), 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const setField = <K extends keyof CareerLeadValues>(key: K, value: CareerLeadValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleBlur = (key: keyof CareerLeadValues) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validate(values));
  };

  const fieldError = (key: keyof CareerLeadValues) => (touched[key] ? errors[key] : undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      currentRole: true,
      yearsExperience: true,
      targetRole: true,
      learningPreference: true,
    });
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('loading');
    try {
      await submitLead(values);
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
        aria-labelledby="lead-modal-heading"
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
            <h3 className="text-xl font-800 text-foreground mb-3">Thanks — you&apos;re on our radar.</h3>
            <p className="text-sm sm:text-base text-muted leading-relaxed mb-6 max-w-sm mx-auto">
              We&apos;ve received your details and will follow up about career support that fits your result.
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
            <p className="section-label mb-4 inline-flex">Build My AI Career</p>
            <h2 id="lead-modal-heading" className="text-xl sm:text-2xl font-800 tracking-tight text-foreground leading-snug mb-2">
              Let&apos;s turn this into a plan.
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-6">
              Share a few details and we&apos;ll follow up about career support that fits your result.
            </p>

            <form onSubmit={handleSubmit} noValidate aria-busy={status === 'loading'}>
              <fieldset disabled={status === 'loading'} className="space-y-6">
                <legend className="sr-only">Build My AI Career form</legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="lead-fullName" className="block text-sm font-700 text-foreground mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      id="lead-fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      value={values.fullName}
                      onChange={(e) => setField('fullName', e.target.value)}
                      onBlur={() => handleBlur('fullName')}
                      placeholder="Jane Doe"
                      aria-invalid={!!fieldError('fullName')}
                      aria-describedby={fieldError('fullName') ? 'lead-fullName-error' : undefined}
                      className={inputBaseClass}
                      style={{ borderColor: fieldError('fullName') ? '#EF4444' : 'var(--border)' }}
                    />
                    <p id="lead-fullName-error" className="text-xs text-red-500 mt-1.5 min-h-[1rem]">{fieldError('fullName')}</p>
                  </div>

                  <div>
                    <label htmlFor="lead-email" className="block text-sm font-700 text-foreground mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => setField('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="you@example.com"
                      aria-invalid={!!fieldError('email')}
                      aria-describedby={fieldError('email') ? 'lead-email-error' : undefined}
                      className={inputBaseClass}
                      style={{ borderColor: fieldError('email') ? '#EF4444' : 'var(--border)' }}
                    />
                    <p id="lead-email-error" className="text-xs text-red-500 mt-1.5 min-h-[1rem]">{fieldError('email')}</p>
                  </div>
                </div>

                <div>
                  <label htmlFor="lead-phone" className="block text-sm font-700 text-foreground mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lead-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={(e) => setField('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    placeholder="+1 555 123 4567"
                    aria-invalid={!!fieldError('phone')}
                    aria-describedby={fieldError('phone') ? 'lead-phone-error' : undefined}
                    className={`${inputBaseClass} sm:max-w-xs`}
                    style={{ borderColor: fieldError('phone') ? '#EF4444' : 'var(--border)' }}
                  />
                  <p id="lead-phone-error" className="text-xs text-red-500 mt-1.5 min-h-[1rem]">{fieldError('phone')}</p>
                </div>

                <ChipField label="Current Role" options={ROLE_OPTIONS} value={values.currentRole} onChange={(v) => setField('currentRole', v)} error={fieldError('currentRole')} />
                <ChipField label="Years of Experience" options={EXPERIENCE_OPTIONS} value={values.yearsExperience} onChange={(v) => setField('yearsExperience', v)} error={fieldError('yearsExperience')} />
                <ChipField label="Target AI Role" options={TARGET_ROLE_OPTIONS} value={values.targetRole} onChange={(v) => setField('targetRole', v)} error={fieldError('targetRole')} />
                <ChipField label="Preferred Learning / Career Support" options={LEARNING_PREFERENCES} value={values.learningPreference} onChange={(v) => setField('learningPreference', v)} error={fieldError('learningPreference')} />

                <div>
                  <label htmlFor="lead-message" className="block text-sm font-700 text-foreground mb-1.5">
                    Message <span className="text-muted-foreground font-500">(optional)</span>
                  </label>
                  <textarea
                    id="lead-message"
                    name="message"
                    rows={3}
                    value={values.message}
                    onChange={(e) => setField('message', e.target.value)}
                    placeholder="Anything specific you'd like help with?"
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
