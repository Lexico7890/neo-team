import { type Database } from './database'

type TeamEntity = Database['public']['Tables']['team']['Row']

export type Team = TeamEntity
