import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '@/utils/validators/common-rules';

// form zod validation schema
export const registerSchema = z.object({
  name: z.string().min(1, { message: messages.nameIsRequired }),
  email: validateEmail,
  password: validatePassword,
});

// generate form types from zod validation schema
export type RegisterSchema = z.infer<typeof registerSchema>;
