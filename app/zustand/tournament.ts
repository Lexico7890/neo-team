import { type Tournament } from '../types/tournament'
import { type StateCreator } from 'zustand'

export interface TournamentSlice {
  tournament: Tournament
  setTournamentId: (tournament: Tournament) => void
}

export const createTournamentSlice: StateCreator<TournamentSlice> = (set) => ({
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
  setTournamentId: (tournament) => { set({ tournament }) }
})
