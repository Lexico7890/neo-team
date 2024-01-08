'use client'

import { type Tournament } from '@/app/types/tournament'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { CiMenuKebab } from 'react-icons/ci'

interface Props {
  tournament: Tournament
}

const ActionMenuTournament = ({ tournament }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger ><CiMenuKebab size={35} /></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem><Link href={`/main/dashboard/${tournament.id}`}>Ver torneo</Link></DropdownMenuItem>
        <DropdownMenuItem>Equipos</DropdownMenuItem>
        <DropdownMenuItem>Partidos</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ActionMenuTournament
