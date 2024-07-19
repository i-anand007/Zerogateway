import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const personalInfoFormSchema = z.object({
  first_name: z.string().min(1, { message: messages.nameIsRequired }),
  email: validateEmail,
  avatar: fileSchema.optional(),
});

// generate form types from zod validation schema
export type PersonalInfoFormTypes = z.infer<typeof personalInfoFormSchema>;

export const defaultValues = {
  first_name: '',
  email: '',
  avatar: undefined,
};
