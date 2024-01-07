import { redirect } from 'next/navigation'
import { type League } from '@/app/types/league'
import { Suspense } from 'react'
import { type Tournament } from '@/app/types/tournament'
import TableListTournament from './components/server/table-list-tournament'
import ModalCreateLeague from './createLeague/server/modal-create-league'
import BottomCreateTournament from './components/client/bottom-create-tournament'
import useInstanceSupabaseServer from '@/app/hooks/useInstanceSupabaseServer'

async function getData () {
  let tournaments: Tournament[] = []
  const { handleSession, handleLeague, handleTournament } =
    useInstanceSupabaseServer()
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
  return (
    <main className="flex flex-col h-full">
      <Suspense fallback={<p>Cargando dashboard...</p>}>
        <div className='flex flex-col gap-2 h-full'>
          <ModalCreateLeague
            isEdit={league !== undefined}
            league={league}
            idUser={session.user.id}
          />
          <div className="border h-full rounded-lg">
            <TableListTournament tournamentData={tournaments} />
          </div>
        </div>
      </Suspense>
      <div className="absolute bottom-6 right-6">
        <BottomCreateTournament />
      </div>
    </main>
  )
}

export default DashboardPage
