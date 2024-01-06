import { type Database } from './database'

type SanctionEntity = Database['public']['Tables']['sanction']['Row']
export type Sanction = SanctionEntity
