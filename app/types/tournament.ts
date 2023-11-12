import { type Database } from './database'

type TournamentEntity = Database['public']['Tables']['tournament']['Row']

type ModifiedTournamentEntity = Omit<TournamentEntity, 'gender' | 'category' | 'variant'> & {
  nombre_genero: string
  nombre_categoria: string
  sub_categoria: string
}

export type Tournament = ModifiedTournamentEntity
