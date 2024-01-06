import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const useDashboardServerSupabase = () => {
  const supabase = createServerComponentClient({ cookies })

  const tournamentGeneralInfo = async (tournamentid: string): Promise<[]> => {
    const { data, error } = await supabase.rpc('get_tournament_count_info', {
      tournamentid
    })
    if (error !== null) {
      throw new Error('No se pudo completar la consulta de torneos general')
    }
    return data
  }

  const getMatchTournament = async (tournamentid: string) => {
    const { data, error } = await supabase.rpc(
      'get_match_show_view_tournament',
      { tournamentid }
    )
    if (error !== null) {
      throw new Error('No se pudo completar la consulta de torneos general')
    }
    return data
  }

  const getTournament = async (tournamentid: string) => {
    const { data, error } = await supabase
      .from('tournament')
      .select('*')
      .eq('id', tournamentid)
    if (error !== null) {
      throw new Error('No se pudo completar la consulta de torneo')
    }
    return data[0]
  }

  const getTournamentState = async () => {
    const { data, error } = await supabase.from('tournament_state').select('*')
    if (error !== null) {
      throw new Error('No se pudo completar la consulta de estado de torneos')
    }
    return data
  }

  const getAwardsOfTournament = async (tournamentid: string) => {
    const { data, error } = await supabase
      .from('award')
      .select('*')
      .eq('tournament_id', tournamentid)
    if (error !== null) {
      throw new Error('No se pudo completar la consulta de premios del torneo')
    }
    return data
  }

  const getSanctionOfTournament = async (tournamentid: string) => {
    const { data, error } = await supabase
      .from('sanction')
      .select('*')
      .eq('tournament_id', tournamentid)
    if (error !== null) {
      throw new Error('No se pudo completar la consulta de sanciones del torneo')
    }
    return data
  }

  return {
    tournamentGeneralInfo,
    getMatchTournament,
    getTournamentState,
    getTournament,
    getAwardsOfTournament,
    getSanctionOfTournament
  }
}

export default useDashboardServerSupabase
