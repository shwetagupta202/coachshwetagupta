import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100, "Name must be 100 characters or fewer."),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  message: z.string().trim().min(1, "Please enter a message.").max(1000, "Message must be 1,000 characters or fewer."),
});