'use client'

import LeagueCard from './components/league'
import NavBar from './components/navbar'
import useGetLeague from './hooks/useGetLeague'

export default function Home () {
  const { league } = useGetLeague()
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
