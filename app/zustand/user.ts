import { type StateCreator } from 'zustand'
import { type User } from '../types/user'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Database } from '../types/database'

export interface UserSlice {
  user: User
  getUser: (userId: string) => void
}

const supabase = createClientComponentClient<Database>()

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: {
    avatar_url: '',
    bird_date: '',
    created_at: '',
    email: '',
    id: '',
    name: '',
    rol_id: '',
    is_completed: false,
    number: '',
    phone_number: '',
    position_id: 0
  },
  getUser: async (userId) => {
    const { data, error } = await supabase.from('users').select('*').eq('id', userId)
    if (error !== null) {
      throw new Error('No se pudo completar la consulta de usuario')
    }
    set({ user: data[0] })
  }
})
