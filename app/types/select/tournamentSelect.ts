import { type Database } from '../database'

type TournamentEntity = Pick<Database['public']['Tables']['tournament']['Row'], 'id' | 'name'>

export type TournamentSelect = TournamentEntity
