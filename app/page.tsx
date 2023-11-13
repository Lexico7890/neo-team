'use client'

import { useEffect } from 'react'
import LeagueCard from './components/league'
import NavBar from './components/navbar'
import useGetLeague from './hooks/useGetLeague'
import { useSupabaseStore } from './zustand/store'

export default function Home () {
  const { league } = useGetLeague()
  const [getCategory, getGender, getSubCategory] = useSupabaseStore(state => [
    state.getCategory,
    state.getGender,
    state.getSubCategory
  ])

  useEffect(() => {
    getCategory()
    getGender()
    getSubCategory()
  }, [])

  return (
    <main>
      <NavBar />
        <div className="flex max-lg:flex-col w-full gap-3 p-3">
          {league?.map((item) => (
            <LeagueCard key={item.id} image={item.url_image} name={item.name}/>
          ))}
        </div>
    </main>
  )
}
