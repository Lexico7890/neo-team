import { type Database } from './database'

type GenderEntity = Database['public']['Tables']['gender']['Row']

export type Gender = GenderEntity
