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
    <section>
      <div className="w-full text-center my-4">
        <span className="sm:text-4xl text-2xl font-bold">
          Centro de creación
        </span>
      </div>
      <div className="sm:p-6 p-2 md:flex gap-10">
        {DATA_MENU.map(({ title, image, path }) => (
          <div className="w-full flex justify-center" key={title}>
            <CardCreation
            title={title}
            urlImage={image}
            isThereButton={true}
            path={path}
          />
          </div>
        ))}
      </div>
    </section>
  )
}

export default PageCreationCenter
