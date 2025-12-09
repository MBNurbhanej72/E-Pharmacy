import { z } from "zod";

export const contactSchema = z.object({
  // --- Name ---
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .min(3, "Name must have at least 3 letters.")
    .max(10, "Name must be 10 letters or less."),

  // --- Email ---
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),

  // --- Country Code ---
  countryCode: z
    .string()
    .min(1, "Country code is required."),

  // --- Phone Number ---
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required.")
    .min(6, "Phone number must be at least 6 digits.")
    .max(15, "Phone number must be 15 digits or less.")
    .regex(/^[0-9]{6,15}$/, "Only digits are allowed."),

  // --- Message ---
  message: z
    .string()
    .trim()
    .min(1, "Message is required.")
    .min(3, "Message must be at least 3 characters.")
    .max(500, "Message must be under 500 characters."),
});