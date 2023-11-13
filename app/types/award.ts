import { type Database } from './database'

type AwardEntity = Database['public']['Tables']['award']['Row']

export type Award = AwardEntity
