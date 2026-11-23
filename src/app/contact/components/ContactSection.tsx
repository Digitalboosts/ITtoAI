'use client';
import React, { useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

type EnquiryType = 'professionals' | 'employers' | 'companies';
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  enquiryType: EnquiryType | null;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const enquiryPaths: { value: EnquiryType; label: string; headline: string; description: string; icon: string }[] = [
  {
    value: 'professionals',
    label: 'Professionals',
    headline: 'Get AI career guidance',
    description: 'Questions about the AI Readiness Assessment, career paths, or building your AI skills.',
    icon: 'UserCircleIcon',
  },
  {
    value: 'employers',
    label: 'Employers',
    headline: 'Hire AI-ready talent',
    description: 'Looking to hire verified, AI-ready technology professionals for your team.',
    icon: 'BriefcaseIcon',
  },
  {
    value: 'companies',
    label: 'Companies',
    headline: 'Transform your workforce',
    description: 'Explore enterprise workforce transformation and team AI readiness.',
    icon: 'BuildingOfficeIcon',
  },
];

const emptyValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  company: '',
  enquiryType: null,
  message: '',
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name looks too short.';
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (values.phone.trim() && !/^[0-9+\-\s()]{7,20}$/.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number.';
  }

  if (!values.enquiryType) {
    errors.enquiryType = 'Select an enquiry type.';
  }

  if (!values.message.trim()) {
    errors.message = 'Please add a short message.';
  } else if (values.message.trim().length < 20) {
    errors.message = 'Please add a little more detail (at least 20 characters).';
  }

  return errors;
}

async function submitEnquiry(values: FormValues): Promise<void> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  if (!res.ok) throw new Error('Failed to submit enquiry');
}

const inputBaseClass =
  'w-full rounded-lg border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40';

export default function ContactSection() {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const formTopRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const setField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleBlur = (key: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validate({ ...values }));
  };

  const selectEnquiryType = (type: EnquiryType) => {
    setField('enquiryType', type);
    setTouched((prev) => ({ ...prev, enquiryType: true }));
  };

  const handlePathCardClick = (type: EnquiryType) => {
    selectEnquiryType(type);
    formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => nameInputRef.current?.focus(), 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, phone: true, company: true, enquiryType: true, message: true });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('loading');
    try {
      await submitEnquiry(values);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleReset = () => {
    setValues(emptyValues);
    setErrors({});
    setTouched({});
    setStatus('idle');
  };

  const handleRetry = () => setStatus('idle');

  const fieldError = (key: keyof FormValues) => (touched[key] ? errors[key] : undefined);

  return (
    <>
      {/* Enquiry Paths */}
      <section id="paths" className="py-20 lg:py-24 bg-secondary" aria-labelledby="paths-heading">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label mb-5 inline-flex">Choose Your Path</span>
            <h2 id="paths-heading" className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5">
              What are you
              <br />
              <span className="text-gradient-primary">reaching out about?</span>
            </h2>
            <p className="text-base sm:text-lg text-muted leading-relaxed">
              Pick the option that fits best — it&apos;ll pre-select the enquiry type in the form below.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto" role="group" aria-label="Choose an enquiry type">
            {enquiryPaths.map((path) => {
              const selected = values.enquiryType === path.value;
              return (
                <button
                  key={path.value}
                  type="button"
                  onClick={() => handlePathCardClick(path.value)}
                  aria-pressed={selected}
                  className="text-left bg-card rounded-xl border p-6 card-hover transition-shadow"
                  style={selected ? { boxShadow: '0 0 0 2px var(--accent)', borderColor: 'var(--accent)' } : { borderColor: 'var(--border)' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(37,99,235,0.08)' }}
                    aria-hidden="true"
                  >
                    <Icon name={path.icon} size={20} className="text-accent" />
                  </div>
                  <p className="text-2xs font-700 text-accent uppercase tracking-wider mb-2">{path.label}</p>
                  <h3 className="text-base font-700 text-foreground mb-2.5">{path.headline}</h3>
                  <p className="text-sm text-muted leading-relaxed">{path.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 lg:py-24 bg-white" aria-labelledby="contact-form-heading">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={formTopRef} className="text-center max-w-2xl mx-auto mb-12 scroll-mt-24">
            <span className="section-label mb-5 inline-flex">Get In Touch</span>
            <h2 id="contact-form-heading" className="section-heading-clamp font-800 tracking-tight text-foreground leading-[1.1] mb-5">
              Send us a
              <br />
              <span className="text-gradient-primary">message.</span>
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8">
              {status === 'success' ? (
                <div className="text-center py-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: 'rgba(16,185,129,0.1)' }}
                    aria-hidden="true"
                  >
                    <Icon name="CheckCircleIcon" size={26} className="text-success" variant="solid" />
                  </div>
                  <h3 className="text-xl font-800 text-foreground mb-3">Message sent.</h3>
                  <p className="text-sm sm:text-base text-muted leading-relaxed mb-6 max-w-sm mx-auto">
                    Thanks for reaching out — our team will get back to you soon.
                  </p>
                  <button type="button" onClick={handleReset} className="btn-secondary">
                    Send another message
                  </button>
                </div>
              ) : status === 'error' ? (
                <div className="text-center py-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: 'rgba(239,68,68,0.1)' }}
                    aria-hidden="true"
                  >
                    <Icon name="ExclamationTriangleIcon" size={24} className="text-red-500" />
                  </div>
                  <h3 className="text-xl font-800 text-foreground mb-3">Something went wrong.</h3>
                  <p className="text-sm sm:text-base text-muted leading-relaxed mb-6 max-w-sm mx-auto">
                    We couldn&apos;t send your message. Your details are still here — please try again.
                  </p>
                  <button type="button" onClick={handleRetry} className="btn-primary">
                    Try again
                    <Icon name="ArrowPathIcon" size={16} aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-busy={status === 'loading'}>
                  <fieldset disabled={status === 'loading'} className="space-y-6">
                    <legend className="sr-only">Contact form</legend>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-700 text-foreground mb-1.5">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          ref={nameInputRef}
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={values.name}
                          onChange={(e) => setField('name', e.target.value)}
                          onBlur={() => handleBlur('name')}
                          placeholder="Jane Doe"
                          aria-invalid={!!fieldError('name')}
                          aria-describedby={fieldError('name') ? 'name-error' : undefined}
                          className={inputBaseClass}
                          style={{ borderColor: fieldError('name') ? '#EF4444' : 'var(--border)' }}
                        />
                        {fieldError('name') && (
                          <p id="name-error" className="text-xs text-red-500 mt-1.5">{fieldError('name')}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-700 text-foreground mb-1.5">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={values.email}
                          onChange={(e) => setField('email', e.target.value)}
                          onBlur={() => handleBlur('email')}
                          placeholder="you@example.com"
                          aria-invalid={!!fieldError('email')}
                          aria-describedby={fieldError('email') ? 'email-error' : undefined}
                          className={inputBaseClass}
                          style={{ borderColor: fieldError('email') ? '#EF4444' : 'var(--border)' }}
                        />
                        {fieldError('email') && (
                          <p id="email-error" className="text-xs text-red-500 mt-1.5">{fieldError('email')}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-700 text-foreground mb-1.5">
                          Phone <span className="text-muted-foreground font-500">(optional)</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          value={values.phone}
                          onChange={(e) => setField('phone', e.target.value)}
                          onBlur={() => handleBlur('phone')}
                          placeholder="+1 555 123 4567"
                          aria-invalid={!!fieldError('phone')}
                          aria-describedby={fieldError('phone') ? 'phone-error' : undefined}
                          className={inputBaseClass}
                          style={{ borderColor: fieldError('phone') ? '#EF4444' : 'var(--border)' }}
                        />
                        {fieldError('phone') && (
                          <p id="phone-error" className="text-xs text-red-500 mt-1.5">{fieldError('phone')}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-700 text-foreground mb-1.5">
                          Company <span className="text-muted-foreground font-500">(optional)</span>
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          autoComplete="organization"
                          value={values.company}
                          onChange={(e) => setField('company', e.target.value)}
                          placeholder="Acme Inc."
                          className={inputBaseClass}
                          style={{ borderColor: 'var(--border)' }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-sm font-700 text-foreground">
                          Enquiry Type <span className="text-red-500">*</span>
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2" role="group" aria-label="Enquiry type">
                        {enquiryPaths.map((path) => {
                          const selected = values.enquiryType === path.value;
                          return (
                            <button
                              key={path.value}
                              type="button"
                              onClick={() => selectEnquiryType(path.value)}
                              aria-pressed={selected}
                              className="px-4 py-2.5 rounded-full text-sm font-600 border transition-colors min-h-[40px]"
                              style={
                                selected
                                  ? { background: 'var(--accent)', color: 'var(--accent-foreground)', borderColor: 'var(--accent)' }
                                  : { background: 'var(--card)', color: 'var(--foreground)', borderColor: 'var(--border)' }
                              }
                            >
                              {path.label}
                            </button>
                          );
                        })}
                      </div>
                      {fieldError('enquiryType') && (
                        <p className="text-xs text-red-500 mt-1.5">{fieldError('enquiryType')}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-700 text-foreground mb-1.5">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={values.message}
                        onChange={(e) => setField('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        placeholder="Tell us a little about what you're looking for..."
                        aria-invalid={!!fieldError('message')}
                        aria-describedby={fieldError('message') ? 'message-error' : undefined}
                        className={`${inputBaseClass} resize-none`}
                        style={{ borderColor: fieldError('message') ? '#EF4444' : 'var(--border)' }}
                      />
                      <div className="flex items-center justify-between mt-1.5">
                        {fieldError('message') ? (
                          <p id="message-error" className="text-xs text-red-500">{fieldError('message')}</p>
                        ) : (
                          <span />
                        )}
                        <p className="text-2xs text-muted-foreground">{values.message.trim().length}/20 min</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full sm:w-auto justify-center"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? (
                        <>
                          <Icon name="ArrowPathIcon" size={16} className="animate-spin" aria-hidden="true" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </fieldset>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
