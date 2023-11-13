import { create } from 'zustand'
import { type Category } from '../types/category'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Database } from '../types/database'
import { type Gender } from '../types/gender'
import { type SubCategory } from '../types/sub-category'

interface CategoryState {
  category: Category[]
  getCategory: () => void
  gender: Gender[]
  getGender: () => void
  subCategory: SubCategory[]
  getSubCategory: () => void
}

const supabase = createClientComponentClient<Database>()

export const useSupabaseStore = create<CategoryState>()((set) => ({
  category: [{ id: '', created_at: '', name: '' }],
  getCategory: async () => {
    const { data: categoryData, error: categoryError } = await supabase
      .from('category')
      .select('*')
    if (categoryError !== null) {
      throw new Error('No se pudo completar la consulta de categoria')
    }
    set({ category: categoryData })
  },
  gender: [{ id: '', created_at: '', name: '' }],
  getGender: async () => {
    const { data: genderData, error: categoryError } = await supabase
      .from('gender')
      .select('*')
    if (categoryError !== null) {
      throw new Error('No se pudo completar la consulta de categoria')
    }
    set({ gender: genderData })
  },
  subCategory: [{ id: 0, created_at: '', name: '' }],
  getSubCategory: async () => {
    const { data: variantData, error: categoryError } = await supabase
      .from('variant')
      .select('*')
    if (categoryError !== null) {
      throw new Error('No se pudo completar la consulta de categoria')
    }
    set({ subCategory: variantData })
  }
}))
