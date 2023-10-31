import { type Database } from './database'

type CategoryEntity = Database['public']['Tables']['category']['Row']
// type UserEntity = Database['public']['Tables']['users']['Row']

export type Category = CategoryEntity
