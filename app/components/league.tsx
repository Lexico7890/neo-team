'use client'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader
} from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const LeagueCard = () => {
  const router = useRouter()
  return (
    <Card className="w-full" radius='none'>
      <CardHeader className="text-3xl font-bold">Titulo liga</CardHeader>
      <CardBody className="flex flex-col sm:flex-row items-center gap-10">
        <Image
          src="/image/laLigaLogo.png"
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
        <Button
          onClick={() => {
            router.push('/league')
          }}
          variant='bordered'
          className='border-2 border-[#111111] text-black text-lg dark:text-white dark:border-white'
        >
          Ver liga
        </Button>
      </CardFooter>
    </Card>
  )
}

export default LeagueCard
