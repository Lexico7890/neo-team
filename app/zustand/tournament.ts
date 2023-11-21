import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Tournament } from '../types/tournament'
import { type Database } from '../types/database'
import { type StateCreator } from 'zustand'

export interface TournamentSlice {
  tournament: Tournament[]
  getTournament: (leagueid: string) => void
}

const supabase = createClientComponentClient<Database>()

export const createTournamentSlice: StateCreator<TournamentSlice> = (set) => ({
  tournament: [],
  getTournament: async (leagueid) => {
    console.log('idd ', leagueid)
    const { data: listTournaments, error: errorListTournament } =
        await supabase.rpc('get_tournaments_id' as never, { leagueid } as any)
    if (errorListTournament !== null) {
      console.error(errorListTournament.message)
      throw new Error('No se pudo completar la consulta de torneos')
    }
    set({ tournament: listTournaments })
  }
})
