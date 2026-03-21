import 'dotenv/config';
import { UserCredentials } from '../types';

export const USERS: Record<string, UserCredentials> = {
  standard: {
    username: process.env.STANDARD_USER ?? 'standard_user',
    password: process.env.PASSWORD       ?? 'secret_sauce',
  },
  locked: {
    username: process.env.LOCKED_USER ?? 'locked_out_user',
    password: process.env.PASSWORD    ?? 'secret_sauce',
  },
} as const;