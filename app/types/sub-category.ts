import { type Database } from './database'

type SubCategoryEntity = Database['public']['Tables']['variant']['Row']

export type SubCategory = SubCategoryEntity
