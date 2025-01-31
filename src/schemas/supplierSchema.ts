import { z } from "zod";

export const supplierSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  title: z.string().min(1, "Title is required"),
  GST: z.string().min(1, "GST number is required"),
  mobileNum: z.string().min(10, "Mobile number must be at least 10 digits"),
  landLineNum: z.string().optional(),
  email: z.string().email("Invalid email format"),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  city: z.string().min(1, "City is required"),
  pincode: z
    .number()
    .min(100000, "Invalid pin code")
    .max(999999, "Invalid pin code"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  status: z.enum(["active", "inactive"]),
});
