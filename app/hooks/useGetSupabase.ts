'use client'

import {
  type Session,
  createClientComponentClient
} from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { type Database } from '../types/database'
import { type League } from '../types/league'
import { type Category } from '../types/category'
import { type Gender } from '../types/gender'
import { type SubCategory } from '../types/sub-category'
import { type Tournament } from '../types/tournament'

const useGetSupabase = () => {
  const [category, setCategory] = useState<Category[]>([])
  const [gender, setGender] = useState<Gender[]>([])
  const [session, getSession] = useState<Session | null>(null)
  const [subCategory, setSubCategory] = useState<SubCategory[]>([])
  const [league, setLeague] = useState<League[]>([])
  const [tournament, setTournament] = useState<Tournament[]>([])

  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const getData = async () => {
      const { data: session } = await supabase.auth.getSession()
      getSession(session.session)
      const { data: category, error } = await supabase
        .from('category')
        .select('*')
      if (error !== null) {
        throw new Error('No se pudo completar la consulta de categoría')
      }
      setCategory(category)
      const { data: gender, error: errorGender } = await supabase
        .from('gender')
        .select('*')
      if (errorGender !== null) {
        throw new Error('No se pudo completar la consulta de genero')
      }
      setGender(gender)
      const { data: subCategory, error: errorSubCategory } = await supabase
        .from('variant')
        .select('*')
      if (errorSubCategory !== null) {
        throw new Error('No se pudo completar la consulta de sub genero')
      }
      setSubCategory(subCategory)
      const { data: league, error: errorLeague } = await supabase
        .from('league')
        .select('*')
        .eq('createdBy', session.session?.user.id as string)
      if (errorLeague !== null) {
        throw new Error('No se pudo completar la consulta de ligas')
      }
      setLeague(league)
      const { data: listTournaments, error: errorListTournament } =
        await supabase.rpc('get_tournaments' as never)
      if (errorListTournament !== null) {
        throw new Error('No se pudo completar la consulta de torneos')
      }
      setTournament(listTournaments)
    }
    getData()
  }, [])
  return {
    category,
    gender,
    session,
    subCategory,
    supabase,
    league,
    tournament
  }
}

export default useGetSupabase
