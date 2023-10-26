'use client'

import { type Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

const useGetSupabase = () => {
  const [category, setCategory] = useState<any[] | null>([])
  const [gender, setGender] = useState<any[] | null>([])
  const [session, getSession] = useState<Session | null>(null)
  const [subCategory, setSubCategory] = useState<any[] | null>([])

  const supabase = createClientComponentClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.auth.getSession()
      getSession(data.session)
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
    }
    getData()
  }, [])
  return { category, gender, session, subCategory }
}

export default useGetSupabase
