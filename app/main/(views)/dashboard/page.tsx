import { redirect } from 'next/navigation'
import Dashboard from './components/dashboard'
import ListLeagueUser from './components/list-league-user'
import useSupabaseData from '@/app/hooks/useSupabaseData'
import ModalCreateLeague from './createLeague/server/modal-create-league'
import { type League } from '@/app/types/league'

/* const DATA_MENU = [
  {
    title: 'Crear Liga',
    image: '/image/imageLeague.jpg',
    path: '/creationCenter/createLeague'
  },
  {
    title: 'Crear Participante',
    image: '/image/imagePlayer.png',
    path: '/creationCenter/createLeague'
  },
  {
    title: 'Crear Equipo',
    image: '/image/imageTeam.png',
    path: '/creationCenter/createLeague'
  }
] as const */

async function getData () {
  const { handleSession, handleLeague, handleTournament } = useSupabaseData()
  const session = await handleSession()
  if (session === null) return redirect('/')
  const league: League = await handleLeague(session?.user.id)
  const tournaments = await handleTournament(league.id)
  return { league, session, tournaments }
}

const PageCreationCenter = async () => {
  const { league, session, tournaments } = await getData()
  return (
    <main className='flex flex-col gap-4'>
      <div className='flex gap-4'>
      <ListLeagueUser tournaments={tournaments} />
      <ModalCreateLeague isEdit={league !== undefined} league={league} isOpen={league === undefined ? true : undefined} idUser={session.user.id}/>
      </div>
      <div className="border border-gray-800 flex flex-col gap-4 p-4">
      <section className="relative">
        <Dashboard />
      </section>
      </div>
    </main>
  )
}

export default PageCreationCenter

/**
 * <div className="flex flex-col justify-center items-center gap-6 ">
      <span className="sm:text-4xl text-2xl font-bold">Centro de creación</span>
      <section className="sectionCreation">
        {
          DATA_MENU.map(({ title, image, path }) => (
            <CardCreation path={path} title={title} urlImage={image} key={title} isThereButton={true}/>
          ))
        }
      </section>
    </div>
 */
