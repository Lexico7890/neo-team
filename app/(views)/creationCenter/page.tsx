'use client'

import CardCreation from './components/card-creation'

const DATA_MENU = [
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
] as const

const PageCreationCenter = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <span className="sm:text-4xl text-2xl font-bold">Centro de creación</span>
      <section className="sectionCreation">
        {
          DATA_MENU.map(({ title, image, path }) => (
            <CardCreation path={path} title={title} urlImage={image} key={title} isThereButton={true}/>
          ))
        }
      </section>
    </div>
  )
}

export default PageCreationCenter
