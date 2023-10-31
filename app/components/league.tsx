import {
  Card,
  CardBody,
  CardFooter,
  CardHeader
} from '@nextui-org/react'
import Image from 'next/image'
import ButtonListLeague from './client/button-list-league'

interface Props {
  name: string
  image: string
}

const LeagueCard = ({ name, image }: Props) => {
  console.log(image)
  return (
    <Card className="w-full" radius='none'>
      <CardHeader className="text-3xl font-bold">{name}</CardHeader>
      <CardBody className="flex flex-col sm:flex-row items-center gap-10">
        <Image
          src={image !== '' ? image : '/image/footyLogo.png'}
          height={100}
          width={100}
          alt="Logo de la liga"
          className='sm:ml-6'
        />
        <div className="contentLeague">
          <span>Cantidad de torneos: 2</span>
          <span>Cantidad de equipos: 10</span>
          <span>Cantidad de jugadores: 50</span>
          <span>Cantidad de partidos: 100</span>
        </div>
      </CardBody>
      <CardFooter>
        <ButtonListLeague />
      </CardFooter>
    </Card>
  )
}

export default LeagueCard
