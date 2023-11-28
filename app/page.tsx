'use client'

import { useEffect } from 'react'
import LeagueCard from './components/league'
import { useSupabaseStore } from './zustand/store'

export default function Home () {
  const [getCategory, getGender, getSubCategory, getLeague, league] = useSupabaseStore(state => [
    state.getCategory,
    state.getGender,
    state.getSubCategory,
    state.getLeague,
    state.league
  ])

  useEffect(() => {
    getCategory()
    getGender()
    getSubCategory()
    getLeague()
  }, [])

  return (
    <main>
        <div className="flex max-lg:flex-col w-full gap-3 p-3 ">
          {league?.map((item) => (
            <LeagueCard key={item.id} image={item.url_image} name={item.name}/>
          ))}
        </div>
    </main>
  )
}

/**
 *
 */
