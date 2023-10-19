'use client'

import { Card, CardBody, Link } from '@nextui-org/react'
import React from 'react'
import { TbTournament } from 'react-icons/tb'
import { RiTeamFill } from 'react-icons/ri'
import { BiSolidUser } from 'react-icons/bi'

const SubMenu = () => {
  return (
    <Card className="w-60 hidden sm:flex md:flex lg:flex h-max">
      <CardBody className='flex flex-col gap-2'>
        <Link href="#" color='secondary' underline='hover' className='flex gap-2'>
          <TbTournament /><p>Torneos</p>
        </Link>
        <Link href="#" color='secondary' underline='hover' className='flex gap-2'>
          <RiTeamFill /><p>Equipos</p>
        </Link>
        <Link href="#" color='secondary' underline='hover' className='flex gap-2'>
          <BiSolidUser /><p>Jugadores</p>
        </Link>
      </CardBody>
    </Card>
  )
}

export default SubMenu
