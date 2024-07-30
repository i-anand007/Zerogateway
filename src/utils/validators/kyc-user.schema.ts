import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const kycUserSchema = z.object({
  fullName: z.string().min(1, { message: messages.fullNameIsRequired }),
  email: validateEmail,
  phone: z
  .string()
  .min(10, { message: "Minimum 10 Digits"})
  .max(10, { message: "Maximum 10 Digits"}),
  role: z.string().min(1, { message: messages.roleIsRequired }),
  status: z.string().min(1, { message: messages.statusIsRequired }),
});

// generate form types from zod validation schema
export type KycUserSchema = z.infer<typeof kycUserSchema>;
