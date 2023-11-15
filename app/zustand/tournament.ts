import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Tournament } from '../types/tournament'
import { type Database } from '../types/database'
import { type StateCreator } from 'zustand'

export interface TournamentSlice {
  tournament: Tournament[]
  getTournament: () => void
}

const supabase = createClientComponentClient<Database>()

export const createTournamentSlice: StateCreator<TournamentSlice> = (set) => ({
  tournament: [],
  getTournament: async () => {
    const { data: listTournaments, error: errorListTournament } =
        await supabase.rpc('get_tournaments' as never)
    if (errorListTournament !== null) {
      throw new Error('No se pudo completar la consulta de torneos')
    }
    set({ tournament: listTournaments })
  }
})
