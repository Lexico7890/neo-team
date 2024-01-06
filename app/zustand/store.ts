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
import { type UserSlice, createUserSlice } from './user'
import { devtools, persist } from 'zustand/middleware'
import { type SanctionSlice, createSanctionSlice } from './sanction'

const sliceResetFns = new Set<() => void>()

export const resetAllSlices = () => {
  sliceResetFns.forEach((resetFn) => {
    resetFn()
  })
}

export const useSupabaseStore = create<
CategorySlice &
GenderSlice &
SubCategorySlice &
LeagueSlice &
TournamentSlice &
AwardSlice &
UserSlice &
SanctionSlice
>()(
  devtools(
    persist((...a) => ({
      ...createFilter(...a),
      ...createLeagueSlice(...a),
      ...createTournamentSlice(...a),
      ...createAwardSlice(...a),
      ...createUserSlice(...a),
      ...createSanctionSlice(...a)
    }), { name: 'supabaseStore' })
  )
)
