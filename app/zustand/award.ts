import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Award } from '../types/award'
import { type Database } from '../types/database'
import { type StateCreator } from 'zustand'

export interface AwardSlice {
  award: Award[]
  getAward: (tournamentid: string) => void
  deleteAward: (id: string, idTournament: string) => void
  setAward: (award: { nameAward: string, value: number }, idTournament: string) => void
}

const supabase = createClientComponentClient<Database>()

export const createAwardSlice: StateCreator<AwardSlice> = (set, get) => ({
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
  },
  deleteAward: async (id, idTournament) => {
    const { error } = await supabase
      .from('award')
      .delete()
      .eq('id', id)
    if (error !== null) {
      throw new Error('No se pudo completar la eliminación de premiación')
    }
    get().getAward(idTournament)
  },
  setAward: async (awardParam, id) => {
    const { error } = await supabase
      .from('award')
      .insert([{ name: awardParam.nameAward, value: awardParam.value, tournament_id: id }])
      .select('*')
    if (error !== null) {
      throw new Error('No se pudo completar la creación de premiación')
    }
    get().getAward(id)
  }
})
