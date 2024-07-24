import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createPlanSchema = z.object({
  plan_name: z.string().min(1, { message: messages.nameIsRequired }),
  plan_base_price: z.string().min(1, { message: "Can't be blank" }),
  plan_discount: z.string().min(1, { message: "Can't be blank" }),
  plan_price: z.string().min(1, { message: "Can't be blank" }),
  payment_pages: z.string().min(1, { message: "Can't be blank" }),
  platform_fees: z.string().min(1, { message: "Can't be blank" }),
  validity: z.string().min(1, { message: "Can't be blank" }),
});

// generate form types from zod validation schema
export type CreatePlanSchema = z.infer<typeof createPlanSchema>;
