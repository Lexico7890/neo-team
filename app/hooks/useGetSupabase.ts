'use client'

import {
  type Session,
  createClientComponentClient
} from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { type Database } from '../types/database'
import { type League } from '../types/league'
import { type Tournament } from '../types/tournament'

const useGetSupabase = () => {
  const [session, getSession] = useState<Session | null>(null)
  const [league, setLeague] = useState<League[]>([])
  const [tournament, setTournament] = useState<Tournament[]>([])
  const [isLoading, setLoading] = useState<boolean>(true)

  const supabase = createClientComponentClient<Database>()

  const handleTournament = async () => {
    const { data: listTournaments, error: errorListTournament } =
        await supabase.rpc('get_tournaments' as never)
    if (errorListTournament !== null) {
      throw new Error('No se pudo completar la consulta de torneos')
    }
    setTournament(listTournaments)
  }

  const handleLeague = async (idUser: string) => {
    const { data: league, error: errorLeague } = await supabase
      .from('league')
      .select('*')
      .eq('createdBy', idUser)
    if (errorLeague !== null) {
      throw new Error('No se pudo completar la consulta de ligas')
    }
    setLeague(league)
  }

  const handleTournamentId = async (idt: string) => {
    const { data, error } = await supabase.rpc('get_tournaments' as never).eq('id', idt)
    if (error !== null) {
      console.error(error.message)
      throw new Error('No se pudo completar la consulta de torneos')
    }
    return data
  }

  useEffect(() => {
    console.log('entro')
    const getData = async () => {
      try {
        setLoading(true)
        const { data: session } = await supabase.auth.getSession()
        getSession(session.session)
        handleLeague(session.session?.user.id as string)
        handleTournament()
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])
  return {
    session,
    supabase,
    league,
    tournament,
    isLoading,
    handleTournament,
    handleLeague,
    handleTournamentId
  }
}

export default useGetSupabase
