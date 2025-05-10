import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a single supabase client for the entire server-side application
export const supabaseServer = createClient(
  process.env.SUPABASE_URL || supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey,
)

// Create a singleton for client-side usage
let clientInstance: ReturnType<typeof createClient> | null = null

export const getSupabaseBrowser = () => {
  if (!clientInstance) {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey)
  }
  return clientInstance
}
