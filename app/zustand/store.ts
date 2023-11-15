import { create } from 'zustand'
import {
  type CategorySlice,
  type GenderSlice,
  type SubCategorySlice,
  createFilter
} from './filters'
import { type LeagueSlice, createLeagueSlice } from './league'
import { type TournamentSlice, createTournamentSlice } from './tournament'

export const useSupabaseStore = create<
CategorySlice & GenderSlice & SubCategorySlice & LeagueSlice & TournamentSlice
>()((...a) => ({
  ...createFilter(...a),
  ...createLeagueSlice(...a),
  ...createTournamentSlice(...a)
}))
