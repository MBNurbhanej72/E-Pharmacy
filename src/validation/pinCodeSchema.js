import z from "zod";

export const pinCodeSchema = z.object({
  pincode: z
    .string()
    .trim()
    .nonempty("Pincode is required.")
    .min(3, "Pincode must be at least 3 characters.")
    .max(10, "Pincode cannot exceed 10 characters.")
    .regex(/^[A-Za-z0-9\- ]+$/, "Pincode can only contain letters, numbers, spaces, or hyphens.")
});
