import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useHookForm, UseFormProps } from 'react-hook-form';

export const authFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

export const registerFormSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    confirmPassword: z.string(),
  })
  .merge(authFormSchema)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const profileFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  image: z.string().url('Please enter a valid URL').optional(),
});

export const journalEntrySchema = z.object({
  content: z.string().min(1, 'Content is required'),
  mood: z.string().min(1, 'Mood is required'),
  tags: z.array(z.string()).default([]),
  isPrivate: z.boolean().default(false),
});

export const goalSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  targetDate: z.string().or(z.date()).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
});

export const moodEntrySchema = z.object({
  mood: z.number().min(1).max(10),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormSchema = z.infer<typeof authFormSchema> |
  z.infer<typeof registerFormSchema> |
  z.infer<typeof profileFormSchema> |
  z.infer<typeof journalEntrySchema> |
  z.infer<typeof goalSchema> |
  z.infer<typeof moodEntrySchema> |
  z.infer<typeof contactFormSchema>;

export function useForm<T extends FormSchema>(
  schema: z.ZodSchema<T>,
  options?: Omit<UseFormProps<T>, 'resolver'>
) {
  return useHookForm<T>({
    resolver: zodResolver(schema),
    ...options,
  });
}

export const formErrorHandler = (error: unknown): string => {
  if (error instanceof z.ZodError) {
    return error.errors.map((err) => err.message).join(', ');
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
};

export const formatFormErrors = (errors: Record<string, any>): string[] => {
  return Object.entries(errors).map(([field, error]) => {
    if (error.message) return error.message;
    return `${field} is invalid`;
  });
};
