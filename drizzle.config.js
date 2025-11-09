import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit'

// Load environment variables from .env.local so Drizzle can read DATABASE_URL
dotenv.config({ path: '.env.local' });

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.jsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL,
  },
});
