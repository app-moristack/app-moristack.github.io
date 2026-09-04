import { z } from 'zod'

export const projectTypes = [
  'Business Website',
  'Web Application',
  'Restaurant Website',
  'E-commerce Website',
  'Booking System',
  'Business Management System',
  'Website Redesign',
  'Other',
] as const

export const contactMethods = ['Email', 'Phone', 'WhatsApp'] as const

export const budgetRanges = [
  'Not sure yet',
  'Under Rs 25,000',
  'Rs 25,000 - Rs 60,000',
  'Rs 60,000 - Rs 150,000',
  'Above Rs 150,000',
] as const

const optionalUrl = z
  .string()
  .trim()
  .max(2048)
  .refine(
    (value) => value === '' || /^https?:\/\/[^\s.]+\.[^\s]{2,}$/i.test(value),
    'Enter a full address starting with http:// or https://',
  )

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name')
    .max(100, 'That name is too long'),
  businessName: z.string().trim().max(120, 'That name is too long'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address')
    .pipe(z.email('Enter a valid email address, for example name@example.com')),
  phone: z
    .string()
    .trim()
    .min(6, 'Please enter a phone number we can reach you on')
    .max(30, 'That number is too long')
    .regex(/^[+\d][\d\s().-]*$/, 'Use digits, spaces and + only'),
  preferredContact: z.enum(contactMethods, {
    message: 'Choose how you would like us to reply',
  }),
  projectType: z.enum(projectTypes, { message: 'Choose the closest project type' }),
  budget: z.enum(budgetRanges, { message: 'Choose an estimated budget' }),
  launchDate: z.string().trim().max(40),
  existingWebsite: optionalUrl,
  message: z
    .string()
    .trim()
    .min(20, 'Please give us at least a sentence or two about the project')
    .max(4000, 'Please keep this under 4000 characters'),
  consent: z
    .boolean()
    .refine((value) => value, 'Please confirm you are happy for us to reply to your enquiry'),
  /** Honeypot: real people never see this field, so anything here is a bot. */
  company_website: z.string().max(0).optional(),
})

export type ContactFormValues = z.infer<typeof contactSchema>

export const contactDefaults: ContactFormValues = {
  fullName: '',
  businessName: '',
  email: '',
  phone: '',
  preferredContact: 'Email',
  projectType: 'Business Website',
  budget: 'Not sure yet',
  launchDate: '',
  existingWebsite: '',
  message: '',
  consent: false,
  company_website: '',
}
