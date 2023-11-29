import { type Database } from './database'

type PositionEntity = Database['public']['Tables']['team_position']['Row']

export type Position = PositionEntity
