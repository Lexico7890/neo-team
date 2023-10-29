import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

const useGetLeague = () => {
  const [league, setLeague] = useState<any[] | null>([])
  const supabase = createClientComponentClient()
  useEffect(() => {
    const getLeague = async () => {
      const { data, error } = await supabase.from('league').select('*')
      if (error !== null) {
        throw new Error('error al intentar obtener las ligas')
      }
      setLeague(data)
    }
    getLeague()
  }, [])
  return { league }
}

export default useGetLeague
