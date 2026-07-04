import { z } from "zod";

export const postApplicationSchema = z.object({
  body: z.object({
    job: z
      .string({ required_error: "Job ID is required" })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid Job ID format"),
    resume: z
      .string({ required_error: "Resume URL or path is required" })
      .url("Invalid resume URL format")
      .or(z.string().min(1, "Resume reference cannot be empty")),
    coverLetter: z
      .string()
      .max(5000, "Cover letter cannot exceed 5000 characters")
      .optional()
      .or(z.literal("")),
    experience: z
      .number({ required_error: "Experience is required" })
      .min(0, "Experience cannot be negative"),
    expectedSalary: z
      .number({ required_error: "Expected salary is required" })
      .min(0, "Expected salary cannot be negative"),
  }),
});

export const getAllApplicationsSchema = z.object({
  params: z.object({
    jobId: z
      .string({ required_error: "Job ID parameter is required" })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid Job ID format"),
  }),
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1))
      .pipe(z.number().min(1, "Page must be at least 1")),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 10))
      .pipe(z.number().min(1, "Limit must be at least 1").max(100, "Limit cannot exceed 100")),
    status: z
      .enum(["pending", "reviewed", "shortlisted", "interviewing", "accepted", "rejected", ""])
      .optional(),
  }),
});

export const updateApplicationStatusSchema = z.object({
  params: z.object({
    id: z
      .string({ required_error: "Application ID parameter is required" })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid Application ID format"),
  }),
  body: z.object({
    status: z.enum(["pending", "reviewed", "shortlisted", "interviewing", "accepted", "rejected"], {
      required_error: "Status is required",
      invalid_type_error: "Invalid application status value",
    }),
  }),
});

export const getMyApplicationsSchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1))
      .pipe(z.number().min(1, "Page must be at least 1")),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 10))
      .pipe(z.number().min(1, "Limit must be at least 1").max(100, "Limit cannot exceed 100")),
    status: z
      .enum(["pending", "reviewed", "shortlisted", "interviewing", "hired", "rejected", ""])
      .optional(),
  }),
});

export const singleApplicationParamsSchema = z.object({
  params: z.object({
    id: z
      .string({ required_error: "Application ID parameter is required" })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid Application ID format"),
  }),
});