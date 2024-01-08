import useInstanceSupabaseServer from '@/app/hooks/useInstanceSupabaseServer'
import { type Tournament } from '@/app/types/tournament'
import { redirect } from 'next/navigation'
import { type League } from '@/app/types/league'
import ModalCreateLeague from '../../createLeague/server/modal-create-league'
import ComponentListTournament from './component-list-tournament'

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

export default async function ComponentDashboard () {
  const { league, session, tournaments } = await getData()
  return (
    <div className="flex flex-col gap-2 h-full">
      <ModalCreateLeague
        isEdit={league !== undefined}
        league={league}
        idUser={session.user.id}
      />
      <ComponentListTournament tournamentData={tournaments} />
    </div>
  )
}
