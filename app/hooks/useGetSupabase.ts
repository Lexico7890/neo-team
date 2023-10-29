'use client'

import {
  type Session,
  createClientComponentClient
} from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { type Database } from '../types/database'
import { type League } from '../types/league'

const useGetSupabase = () => {
  const [category, setCategory] = useState<any[] | null>([])
  const [gender, setGender] = useState<any[] | null>([])
  const [session, getSession] = useState<Session | null>(null)
  const [subCategory, setSubCategory] = useState<any[] | null>([])
  const [league, setLeague] = useState<League[]>([])
  const [tournament, setTournament] = useState<any[] | null>([])

  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const getData = async () => {
      let user: string = ''
      const { data } = await supabase.auth.getSession()
      getSession(data.session)
      if (data.session?.user.id === null) {
        user = data.session.user.id
      }
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
      if (errorLeague !== null) {
        throw new Error('No se pudo completar la consulta de ligas')
      }
      console.log('ligas: ', league)
      league.length > 0 && setLeague(league.filter(item => item.createdBy === user))
      const { data: listTournaments, error: errorListTournament } =
        await supabase
          .from('tournament')
          .select('*')
          .eq('league_id', league[0].id)
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
