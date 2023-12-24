import {
  createServerComponentClient
} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const useSupabaseData = () => {
  const supabase = createServerComponentClient({ cookies })

  const handleSession = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  }

  const handleTournament = async (leagueid: string) => {
    const { data, error: errorListTournament } =
        await supabase.rpc('get_tournaments_id', { leagueid })
    if (errorListTournament !== null) {
      console.log(errorListTournament.message)
      throw new Error('No se pudo completar la consulta de torneos')
    }
    return data
  }

  const handleLeague = async (idUser: string) => {
    const { data: league, error: errorLeague } = await supabase
      .from('league')
      .select('*')
      .eq('createdBy', idUser)
    if (errorLeague !== null) {
      throw new Error('No se pudo completar la consulta de ligas')
    }
    return league[0]
  }

  const handleTournamentId = async (idt: string) => {
    const { data, error } = await supabase.rpc('get_tournaments' as never).eq('id', idt)
    if (error !== null) {
      console.error(error.message)
      throw new Error('No se pudo completar la consulta de torneos')
    }
    return data
  }

  return {
    supabase,
    handleTournament,
    handleLeague,
    handleTournamentId,
    handleSession
  }
}

export default useSupabaseData
