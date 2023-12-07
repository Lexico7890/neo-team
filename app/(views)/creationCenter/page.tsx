import useSession from '@/app/hooks/useSession'

import { redirect } from 'next/navigation'
import Dashboard from './components/dashboard'
import ListLeagueUser from './components/list-league-user'

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

const PageCreationCenter = async () => {
  const { session } = await useSession()
  if (session === null) return redirect('/')
  return (
<>
<ListLeagueUser />
<main className='border border-gray-400 flex flex-col gap-4 p-4'>
      <h2 className='text-4xl font-bold'>Dashboard</h2>
      <section className='relative'>
      <Dashboard />
      </section>
    </main>
</>

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
