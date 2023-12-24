import { type TournamentSelect } from '../types/select/tournamentSelect'
import { type Tournament } from '../types/tournament'
import { type StateCreator } from 'zustand'

const sliceResetFns = new Set<() => void>()

const initialTournamentState = {
  tournament: {
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
    value: 0
  },
  tournamentSelect: {
    id: '',
    name: ''
  }
}

export interface TournamentSlice {
  tournament: Tournament
  tournamentSelect: TournamentSelect
  setTournamentId: (tournament: TournamentSelect) => void
  resetTournament: () => void
}

export const createTournamentSlice: StateCreator<TournamentSlice> = (set) => {
  sliceResetFns.add(() => {
    set(initialTournamentState)
  })
  return {
    ...initialTournamentState,
    setTournamentId: (tournamentSelect) => {
      set({ tournamentSelect })
    },
    resetTournament: () => {
      set(initialTournamentState)
    }
  }
}
