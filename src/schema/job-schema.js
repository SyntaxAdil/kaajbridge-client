import { z } from "zod";

export const jobCreateSchema = z.object({
  title: z.string().min(3, "Job title is required"),
  company: z.string().min(2, "Company name is required"),
  location: z.string().min(2, "Location is required"),
  experience: z.enum(["entry", "mid", "senior", "lead"], {
    required_error: "Please select an experience level",
  }),
  type: z.enum(["full-time", "part-time", "remote", "contract", "internship"], {
    required_error: "Please select a job type",
  }),
  salary: z.object({
    min: z.coerce.number().min(0, "Minimum salary must be positive"),
    max: z.coerce.number().min(0, "Maximum salary must be positive"),
    currency: z.string().default("BDT"),
  }),
  description: z.string().min(10, "Description must be at least 10 characters"),
  requirements: z.string().min(3, "Requirements are required"),
  skills: z.string().min(3, "Skills are required"),
  applicationDeadline: z.string().min(1, "Deadline is required"),
  status: z.string().default("open"),
  companyLogo: z.string().url("Must be a valid image URL").optional().or(z.literal("")),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms stating this job is exclusively for Diploma holders" }),
  }),
});