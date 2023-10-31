import { type Database } from './database'

type TournamentEntity = Database['public']['Tables']['tournament']['Row']

export type Tournament = TournamentEntity
