import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters.")
    .max(120, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Please provide a brief message.")
    .max(4000, "Message is too long."),
  // Honeypot — real users never fill this in; bots reliably do.
  company: z.string().max(0, "").optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
