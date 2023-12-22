import { type StateCreator } from 'zustand'
import { type Team } from '../types/team'

export interface TeamSlice {
  team: Team
  setMyTeam: (team: Team) => void
}

export const createTeamSlice: StateCreator<TeamSlice> = (set) => ({
  team: {
    name: '',
    id: '',
    campus: '',
    created_at: '',
    image: '',
    main_color: '',
    second_color: ''
  },
  setMyTeam: (team: Team) => { set({ team }) }
})
