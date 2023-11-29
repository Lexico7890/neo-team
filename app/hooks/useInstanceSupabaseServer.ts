import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Database } from '../types/database'

const useInstanceSupabaseServer = () => {
  const supabase = createClientComponentClient<Database>()
  return { supabase }
}

export default useInstanceSupabaseServer
