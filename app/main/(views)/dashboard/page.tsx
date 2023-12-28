import { redirect } from 'next/navigation'
import useSupabaseData from '@/app/hooks/useSupabaseData'
import { type League } from '@/app/types/league'
import { Suspense } from 'react'
import { type Tournament } from '@/app/types/tournament'
import TableListTournament from './components/server/table-list-tournament'
import ModalCreateLeague from './createLeague/server/modal-create-league'

async function getData () {
  let tournaments: Tournament[] = []
  const { handleSession, handleLeague, handleTournament } = useSupabaseData()
  const session = await handleSession()
  if (session === null) return redirect('/')
  const league: League = await handleLeague(session?.user.id)
  if (league !== undefined) {
    tournaments = await handleTournament(league.id)
  }
  return { league, session, tournaments }
}

const DashboardPage = async () => {
  const { league, session, tournaments } = await getData()
  console.log('entro')
  return (
    <main className="flex flex-col gap-4 mt-6 h-full">
      <Suspense fallback={<p>Cargando dashboard...</p>}>
        <div>
        <ModalCreateLeague
          isEdit={league !== undefined}
          league={league}
          isOpen={league === undefined ? true : undefined}
          idUser={session.user.id}
        />
        <div className='border mt-2'>
          <TableListTournament tournamentData={tournaments} />
        </div>
        </div>
      </Suspense>
    </main>
  )
}

export default DashboardPage

/**
 * <div className="flex gap-4">
          <ListLeagueUser tournaments={tournaments} leagueId={league.id} />
        </div>
        <div className="border border-gray-800 flex flex-col gap-4 p-4 h-auto">
          <section className="relative h-full">
            <Dashboard />
          </section>
        </div>
 */
