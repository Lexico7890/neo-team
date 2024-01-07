import { type Database } from './database'

type TournamentDatabaseEntity = Database['public']['Tables']['tournament']['Row']
export type TournamentDatabase = TournamentDatabaseEntity
