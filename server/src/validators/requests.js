import { z } from 'zod'
const base = { fullName: z.string().min(2), email: z.string().email(), phone: z.string().min(5), customerType: z.enum(['business', 'individual']), consent: z.coerce.boolean().refine(Boolean) }
export const inquirySchema = z.object({ ...base, companyName: z.string().optional(), message: z.string().min(10), serviceRequired: z.string().optional() })
export const quotationSchema = z.object({ ...base, companyName: z.string().min(2), projectDescription: z.string().min(10), serviceCategory: z.string().optional(), preferredConsultation: z.string().optional(), targetDate: z.string().optional(), budgetRange: z.string().optional() })
