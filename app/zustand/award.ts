import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Award } from '../types/award'
import { type Database } from '../types/database'
import { type StateCreator } from 'zustand'

export interface AwardSlice {
  award: Award[]
  getAward: (tournamentid: string) => void
}

const supabase = createClientComponentClient<Database>()

export const createAwardSlice: StateCreator<AwardSlice> = (set) => ({
  award: [],
  getAward: async (tournamentid) => {
    const { data, error } = await supabase
      .from('award')
      .select('*')
      .eq('tournament_id', tournamentid)
    if (error !== null) {
      throw new Error('No se pudo completar la consulta de premiación')
    }
    set({ award: data })
  }
})
