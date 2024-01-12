import useInstanceSupabaseServer from '@/app/hooks/useInstanceSupabaseServer'
import { type Tournament } from '@/app/types/tournament'
import { redirect } from 'next/navigation'
import { type League } from '@/app/types/league'
import ModalCreateLeague from '../../createLeague/server/modal-create-league'
import ComponentListTournament from './component-list-tournament'
import { Suspense } from 'react'

export default async function ComponentDashboard () {
  let tournaments: Tournament[] = []
  let league: League = {
    id: '',
    name: '',
    url_image: '',
    created_at: '',
    createdBy: ''
  }
  const { handleSession, handleLeague, handleTournament } =
    useInstanceSupabaseServer()
  const session = await handleSession()
  if (session === null) return redirect('/')
  const loadData = async () => {
    await new Promise(resolve => {
      setTimeout(resolve, 2000)
    })
    league = await handleLeague(session?.user.id)
    if (league !== undefined) {
      tournaments = await handleTournament(league.id)
    }
  }

  await loadData()
  console.log('tour ', tournaments)
  return (
    <div className="flex flex-col gap-2 h-full">
      <ModalCreateLeague
        isEdit={league !== undefined}
        league={league}
        idUser={session.user.id}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <ComponentListTournament tournamentData={tournaments} />
      </Suspense>
    </div>
  )
}

/**
 * <ModalCreateLeague
        isEdit={league !== undefined}
        league={league}
        idUser={session.user.id}
      />
 */
