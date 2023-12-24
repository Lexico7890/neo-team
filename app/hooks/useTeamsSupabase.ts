import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const useTeamsSupabase = () => {
  const supabase = createServerComponentClient({ cookies })

  const handleGetTeamsByTournament = async (tournamentId: string) => {
    const { data, error } = supabase.from('teams').select('*').eq('tournament_id', tournamentId)
  }
  return supabase
}

export default useTeamsSupabase
