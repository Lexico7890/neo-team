import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const useDashboardServerSupabase = () => {
  const supabase = createServerComponentClient({ cookies })

  const tournamentGeneralInfo = async (tournamentid: string): Promise<[]> => {
    const { data, error } = await supabase.rpc('get_tournament_count_info', { tournamentid })
    if (error !== null) {
      throw new Error('No se pudo completar la consulta de torneos general')
    }
    console.log('data2 ', data)
    return data
  }

  return { tournamentGeneralInfo }
}

export default useDashboardServerSupabase
