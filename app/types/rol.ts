import { type Database } from './database'

type RolEntity = Database['public']['Tables']['rol']['Row']

export type Rol = RolEntity
