import { type StateCreator } from 'zustand'

import { type Category } from '../types/category'
import { type Gender } from '../types/gender'
import { type SubCategory } from '../types/sub-category'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Database } from '../types/database'

export interface CategorySlice {
  category: Category[]
  getCategory: () => void
}

export interface GenderSlice {
  gender: Gender[]
  getGender: () => void
}

export interface SubCategorySlice {
  subCategory: SubCategory[]
  getSubCategory: () => void
}

const supabase = createClientComponentClient<Database>()

export const createFilter: StateCreator<CategorySlice & GenderSlice & SubCategorySlice> = (set) => ({
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
      throw new Error('No se pudo completar la consulta de genero')
    }
    set({ gender: genderData })
  },
  subCategory: [{ id: 0, created_at: '', name: '' }],
  getSubCategory: async () => {
    const { data: variantData, error: categoryError } = await supabase
      .from('variant')
      .select('*')
    if (categoryError !== null) {
      throw new Error('No se pudo completar la consulta de sub-categoria')
    }
    set({ subCategory: variantData })
  }
})
