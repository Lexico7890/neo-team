'use client'

import LeagueCard from './components/league'
import NavBar from './components/navbar'
import SubMenu from './components/sub-menu'

export default function Home () {
  return (
    <main>
      <NavBar />
      <div className="p-3 flex gap-3 h-auto mt-3">
        <SubMenu />
        <div className="flex flex-col w-full gap-3">
          <LeagueCard />
          <LeagueCard />
          <LeagueCard />
        </div>
      </div>
    </main>
  )
}
