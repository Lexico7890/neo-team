import { type Tournament } from '../types/tournament'
import { type StateCreator } from 'zustand'
import useInstanceSupabaseServer from '../hooks/useInstanceSupabaseServer'

export interface TournamentSlice {
  tournament: Tournament[]
  getTournament: (leagueid: string) => void
}

const { supabase } = useInstanceSupabaseServer()

export const createTournamentSlice: StateCreator<TournamentSlice> = (set) => ({

  tournament: [],
  getTournament: async (leagueid) => {
    const { data: listTournaments, error: errorListTournament } =
        await supabase.rpc('get_tournaments_id' as never, { leagueid } as any)
    if (errorListTournament !== null) {
      console.error(errorListTournament.message)
      throw new Error('No se pudo completar la consulta de torneos')
    }
    set({ tournament: listTournaments })
  }
})
