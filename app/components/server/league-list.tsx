import LeagueCard from '../league-card'
import { type League } from '@/app/types/league'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

async function getData (): Promise<League[]> {
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.from('league').select('*')
  if (error !== null) {
    throw new Error('No se pudo completar la consulta de categoria')
  }
  return data
}

export default async function LeagueList () {
  const data = await getData()
  console.log(data)
  return (
    <>
      {data?.map((item) => (
        <LeagueCard key={item.id} image={item.url_image} name={item.name} />
      ))}
    </>
  )
}
