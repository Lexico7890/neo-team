import { type Database } from './database'

type TournamentStateEntity = Database['public']['Tables']['tournament_state']['Row']
export type TournamentState = TournamentStateEntity
