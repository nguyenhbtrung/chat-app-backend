import { z } from 'zod';

export const registerSchema = z.object({
    userName: z.string().min(1, { message: 'Username is required' }),
    email: z.email({ message: 'Email format is invalid' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' })
});

export const loginSchema = z.object({
    userName: z.string().min(1, { message: 'Username is required' }),
    password: z.string().min(1, { message: 'Username is required' })
});