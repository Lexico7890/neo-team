'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Image from 'next/image'
import ButtonListLeague from './client/button-list-league'

interface Props {
  name: string
  image: string | null
}

const LeagueCard = ({ name, image }: Props) => {
  return (
    <Card className='w-full'>
      <CardHeader className="text-3xl font-bold"><CardTitle>{name}</CardTitle></CardHeader>
      <CardContent className="flex flex-col sm:flex-row items-center gap-10 min-h-[124px]">
        <Image
          src={image ?? ''}
          height={100}
          width={100}
          alt="Logo de la liga"
          className='sm:ml-6'
        />
        <div className="flex gap-3">
          <span>Cantidad de torneos: 2</span>
          <span>Cantidad de equipos: 10</span>
          <span>Cantidad de jugadores: 50</span>
          <span>Cantidad de partidos: 100</span>
        </div>
      </CardContent>
      <CardFooter>
        <ButtonListLeague />
      </CardFooter>
    </Card>
  )
}

export default LeagueCard
