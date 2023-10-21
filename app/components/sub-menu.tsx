'use client'

import { Card, CardBody } from '@nextui-org/react'
import { TbTournament } from 'react-icons/tb'
import { RiTeamFill } from 'react-icons/ri'
import { BiSolidUser } from 'react-icons/bi'
import Link from 'next/link'

const SubMenu = () => {
  return (
    <Card className="w-60 hidden sm:flex md:flex lg:flex h-max sm:gap-6">
      <CardBody className='flex flex-col gap-2'>
        <Link href="#" className='flex gap-2 text-[#111111] dark:text-white text-xl'>
          <TbTournament /><p className='border-b-2 border-[#111111] dark:border-white hover:border-b-4'>Torneos</p>
        </Link>
        <Link href="#" className='flex gap-2 text-[#111111] dark:text-white text-xl'>
          <RiTeamFill /><p className='border-b-2 border-[#111111] dark:border-white hover:border-b-4'>Equipos</p>
        </Link>
        <Link href="#" className='flex gap-2 text-[#111111] dark:text-white text-xl'>
          <BiSolidUser /><p className='border-b-2 border-[#111111] dark:border-white hover:border-b-4'>Jugadores</p>
        </Link>
      </CardBody>
    </Card>
  )
}

export default SubMenu
