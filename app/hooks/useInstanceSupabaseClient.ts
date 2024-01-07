import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { type Category } from '../types/category'
import { type Gender } from '../types/gender'
import { type SubCategory } from '../types/sub-category'
import { type TournamentDatabase } from '../types/tournamentDatabase'

const useInstanceSupabaseClient = (id?: string) => {
  const [category, setCategory] = useState<Category[]>([])
  const [gender, setGender] = useState<Gender[]>([])
  const [subCategory, setSubCategory] = useState<SubCategory[]>([])
  const [dataTournament, setTournament] = useState<TournamentDatabase>()

  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchSelects = async () => {
      const { data: dataCategory, error: errorCategory } = await supabase
        .from('category')
        .select('*')
      if (errorCategory != null) {
        throw new Error(errorCategory.message)
      }
      dataCategory !== null && setCategory(dataCategory)
      const { data: dataGender, error: errorGender } = await supabase
        .from('gender')
        .select('*')
      if (errorGender != null) {
        throw new Error(errorGender.message)
      }
      dataGender !== null && setGender(dataGender)
      const { data: dataSubCategory, error: errorSubCategory } = await supabase
        .from('sub_category')
        .select('*')
      if (errorSubCategory != null) {
        throw new Error(errorSubCategory.message)
      }
      dataSubCategory !== null && setSubCategory(dataSubCategory)
      if (id !== undefined) {
        const { data: dataTournament, error: errorTournament } = await supabase.from('tournament').select('*').eq('id', id)
        if (errorTournament !== null) {
          throw new Error(errorTournament.message)
        }
        setTournament(dataTournament[0] as TournamentDatabase)
      }
    }
    fetchSelects()
  }, [])

  return { category, gender, subCategory, dataTournament }
}

export default useInstanceSupabaseClient
