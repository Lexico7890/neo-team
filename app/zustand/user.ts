import { type StateCreator } from 'zustand'
import { type User } from '../types/user'
import useInstanceSupabaseServer from '../hooks/useInstanceSupabaseServer'
import { type Rol } from '../types/rol'

export interface UserSlice {
  user: User
  getUser: (userId: string) => void
  setUser: (user: User) => void
  userRol: string
  setUserRol: (userId: string, roles: Rol[]) => void
}

const { supabase } = useInstanceSupabaseServer()

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
    position_id: 0,
    number_identity: '',
    gender: ''
  },
  userRol: '',
  getUser: async (userId) => {
    const { data, error } = await supabase.from('users').select('*').eq('id', userId)
    if (error !== null) {
      throw new Error('No se pudo completar la consulta de usuario')
    }
    set({ user: data[0] })
  },
  setUser: (user) => { set({ user }) },
  setUserRol: (id, roles) => {
    const rolName = roles.filter(rol => rol.id === id)
    set({ userRol: rolName[0].name })
  }
})
