import { type Tournament } from '../types/tournament'
import { type StateCreator } from 'zustand'

const sliceResetFns = new Set<() => void>()

const initialTournamentState = {
  /* tournament: {
    id: '',
    contact_name: '',
    contact_number: '',
    created_at: '',
    description: '',
    name: '',
    isFlag: false,
    league_id: '',
    nombre_categoria: '',
    nombre_genero: '',
    sub_categoria: '',
    value: 0,
    state_id: ''
  }, */
  tournament: [] as Tournament[]
}

export interface TournamentSlice {
  tournament: Tournament[]
  setTournamentList: (newTournament: Tournament[]) => void
  resetTournament: () => void
  setTournament: (tournament: Tournament) => void
}

export const createTournamentSlice: StateCreator<TournamentSlice> = (set) => {
  sliceResetFns.add(() => {
    set(initialTournamentState)
  })
  return {
    ...initialTournamentState,
    resetTournament: () => {
      set(initialTournamentState)
    },
    setTournament: (newTournament) => {
      set((prev) => ({
        tournament: [...prev.tournament, newTournament]
      }))
    },
    setTournamentList: (newTournament) => { set({ tournament: newTournament }) }
  }
}
