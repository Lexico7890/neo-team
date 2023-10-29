'use client'

import LeagueCard from './components/league'
import NavBar from './components/navbar'
import SubMenu from './components/sub-menu'
import useGetLeague from './hooks/useGetLeague'

export default function Home () {
  const { league } = useGetLeague()
  return (
    <main>
      <NavBar />
      <div className="p-3 flex gap-3 h-auto mt-3">
        <SubMenu />
        <div className="flex flex-col w-full gap-3">
          {league?.map((item) => (
            <LeagueCard key={item.id} image={item.url_image} name={item.name}/>
          ))}
        </div>
      </div>
    </main>
  )
}
