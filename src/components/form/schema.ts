import { emailSchema, phoneSchema } from "@/utils/validate";
import * as z from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required."),
  businessEmail: emailSchema,
  companyName: z.string().min(1, "Company is required."),
  phoneNumber: phoneSchema,
  message: z.string().optional(),
  // Honeypot field
  company_website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
