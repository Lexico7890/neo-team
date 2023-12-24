import { type Database } from './database'

type SubCategoryEntity = Database['public']['Tables']['sub_category']['Row']

export type SubCategory = SubCategoryEntity
