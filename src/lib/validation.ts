import { z } from 'zod';

const name = z.string().trim().min(2, 'Name looks too short.').max(120);
const email = z.string().trim().min(1, 'Email is required.').email('Enter a valid email address.').max(200);
const phone = z.string().trim().min(7, 'Enter a valid phone number.').max(20).regex(/^[0-9+\-\s()]+$/, 'Enter a valid phone number.');
const optionalMessage = z.string().trim().max(2000).optional().default('');

// Join / Candidate form (assessment "I Want to Build My AI Career")
export const candidateSchema = z.object({
  fullName: name,
  email,
  phone,
  currentRole: z.string().trim().min(1, 'Select your current role.').max(120),
  yearsExperience: z.string().trim().min(1, 'Select your years of experience.').max(60),
  targetRole: z.string().trim().min(1, 'Select a target AI role.').max(120),
  learningPreference: z.string().trim().min(1, 'Select a preference.').max(120),
  message: optionalMessage,
});
export type CandidateInput = z.infer<typeof candidateSchema>;

// Company / Hiring form
export const companySchema = z.object({
  fullName: name,
  workEmail: email,
  phone,
  companyName: z.string().trim().min(1, 'Company name is required.').max(200),
  companySize: z.string().trim().min(1, 'Select a company size.').max(60),
  hiringFor: z.string().trim().min(1, 'Select what you’re hiring for.').max(120),
  timeline: z.string().trim().min(1, 'Select a hiring timeline.').max(120),
  message: optionalMessage,
});
export type CompanyInput = z.infer<typeof companySchema>;

// General Contact form
export const contactSchema = z.object({
  name,
  email,
  phone: z.string().trim().max(20).regex(/^[0-9+\-\s()]*$/, 'Enter a valid phone number.').optional().default(''),
  company: z.string().trim().max(200).optional().default(''),
  enquiryType: z.enum(['professionals', 'employers', 'companies'], { message: 'Select an enquiry type.' }),
  message: z.string().trim().min(20, 'Please add a little more detail (at least 20 characters).').max(2000),
});
export type ContactInput = z.infer<typeof contactSchema>;

export type SubmissionStatus = 'new' | 'reviewed';
