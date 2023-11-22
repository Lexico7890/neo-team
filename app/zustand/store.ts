import { create } from 'zustand'
import {
  type CategorySlice,
  type GenderSlice,
  type SubCategorySlice,
  createFilter
} from './filters'
import { type LeagueSlice, createLeagueSlice } from './league'
import { type TournamentSlice, createTournamentSlice } from './tournament'
import { type AwardSlice, createAwardSlice } from './award'

export const useSupabaseStore = create<
CategorySlice & GenderSlice & SubCategorySlice & LeagueSlice & TournamentSlice & AwardSlice
>()((...a) => ({
  ...createFilter(...a),
  ...createLeagueSlice(...a),
  ...createTournamentSlice(...a),
  ...createAwardSlice(...a)
}))
