import { type StateCreator } from 'zustand'
import { type League } from '../types/league'
import useInstanceSupabaseServer from '../hooks/useInstanceSupabaseServer'

export interface LeagueSlice {
  league: League[]
  getLeague: () => Promise<void>
  leagueId: League
  getLeagueId: () => void
  setLeague: (league: League[]) => void
}

const { supabase } = useInstanceSupabaseServer()

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
      if (foundLeague === undefined) {
        return {
          id: '',
          name: '',
          created_at: '',
          createdBy: '',
          url_image: ''
        }
      }
      return { leagueId: foundLeague }
    })
  },
  setLeague: (league) => { set({ league }) }
})
