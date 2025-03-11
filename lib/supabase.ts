import { createClient } from '@supabase/supabase-js'

// Supabase configuration - using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lyfjacpmbffbrlsrbrbu.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5ZmphY3BtYmZmYnJsc3JicmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzOTM1OTYsImV4cCI6MjA1Njk2OTU5Nn0.SPPERdDZJ_E4cAZUQMzifs0nzgcC7VfwvYfm7dgWflo'

// Create the Supabase client with specific configuration for better error handling
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    // Set a custom fetch implementation if needed for debugging
    fetch: (...args) => {
      // Only log in development environment
      if (process.env.NODE_ENV === 'development') {
        console.log('Supabase fetch:', args[0]);
      }
      return fetch(...args);
    },
  },
  db: {
    schema: 'public',
  },
})

export default supabase