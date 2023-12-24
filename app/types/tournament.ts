import { type Database } from './database'

type TournamentEntity = Database['public']['Tables']['tournament']['Row']

type ModifiedTournamentEntity = Omit<TournamentEntity, 'gender' | 'category' | 'sub_category'> & {
  nombre_genero: string
  nombre_categoria: string
  sub_categoria: string
}

export type Tournament = ModifiedTournamentEntity
