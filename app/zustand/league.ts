import { type StateCreator } from 'zustand'
import { type League } from '../types/league'

const sliceResetFns = new Set<() => void>()

const initialLeagueState: { league: League } = {
  league: {
    id: '',
    name: '',
    url_image: '',
    created_at: '',
    createdBy: ''
  }
}

export interface LeagueSlice {
  league: League
  resetLeague: () => void
  setLeague: (league: League) => void
}

export const createLeagueSlice: StateCreator<LeagueSlice> = (set) => {
  sliceResetFns.add(() => {
    set(initialLeagueState)
  })
  return {
    ...initialLeagueState,
    resetLeague: () => {
      set(initialLeagueState)
    },
    setLeague: (league) => { set({ league }) }
  }
}
