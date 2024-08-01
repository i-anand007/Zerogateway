import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const createUPISchema = z.object({
    upi_id: z.string().regex(new RegExp('[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}')),
    merchant: z.boolean(),
});

// generate form types from zod validation schema
export type CreateUPISchema = z.infer<typeof createUPISchema>;
