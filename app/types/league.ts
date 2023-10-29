import { type Database } from './database'

type LeagueEntity = Database['public']['Tables']['league']['Row']
// type UserEntity = Database['public']['Tables']['users']['Row']

export type League = LeagueEntity
