import { Suspense } from 'react'
import LeagueList from './components/server/league-list'

export default function Home () {
  return (
    <main>
        <div className="flex max-lg:flex-col w-full gap-3 p-3 ">
          <Suspense fallback={<p>Cargando...</p>}>
            <LeagueList />
          </Suspense>
        </div>
    </main>
  )
}
