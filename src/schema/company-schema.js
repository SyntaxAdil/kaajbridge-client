import { z } from "zod";

export const companyRegisterSchema = z.object({
  name: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  industry: z.string().min(1, "Please select an industry"),
  size: z.enum(["1-10", "11-50", "51-200", "201-500", "500+"], {
    required_error: "Please select company size",
  }),
  address: z.object({
    street: z.string().min(3, "Street address is required"),
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
  }),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  companyLogo: z.string().url("Must be a valid image URL").optional().or(z.literal("")),
  description: z.string().optional(),
  founded: z.coerce.number().min(1700).max(new Date().getFullYear()).optional(),
  social: z.object({
    linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
    facebook: z.string().url("Invalid URL").optional().or(z.literal("")),
    twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
  }).optional(),
});