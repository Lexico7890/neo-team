import { type StateCreator } from 'zustand'
import { type League } from '../types/league'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Database } from '../types/database'

export interface LeagueSlice {
  league: League[]
  getLeague: () => void
  leagueId: League
  getLeagueId: () => void
}

const supabase = createClientComponentClient<Database>()

export const createLeagueSlice: StateCreator<LeagueSlice> = (set) => ({
  league: [],
  getLeague: async () => {
    const { data: leagueData, error: leagueError } = await supabase
      .from('league')
      .select('*')
    if (leagueError !== null) {
      throw new Error('No se pudo completar la consulta de categoria')
    }
    set({ league: leagueData })
  },
  leagueId: {
    id: '',
    name: '',
    created_at: '',
    createdBy: '',
    url_image: ''
  },
  getLeagueId: async () => {
    const { data: session } = await supabase.auth.getSession()
    set((state) => {
      const foundLeague = state.league.find(item => item.createdBy === session.session?.user.id)
      console.log('f', foundLeague)
      console.log('fs', state.league)
      return { leagueId: foundLeague }
    })
  }
})
