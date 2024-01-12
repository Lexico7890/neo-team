'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import ActionMenuTournament from '../client/action-menu-tournament'
import { type Tournament } from '@/app/types/tournament'
import BottomEditTournament from '../client/bottom-edit-tournament'
import { useSupabaseStore } from '@/app/zustand/store'
import { useEffect, useState } from 'react'

interface Props {
  tournamentData: Tournament[]
}

interface Props {
  tournamentData: Tournament[]
}
const ComponentListTournament = ({ tournamentData }: Props) => {
  const [currentTournament, setCurrentTournament] = useState<Tournament[]>([])
  const [tournament, setTournamentList, resetTournament] = useSupabaseStore(
    (state) => [
      state.tournament,
      state.setTournamentList,
      state.resetTournament
    ]
  )

  useEffect(() => {
    resetTournament()
    setTournamentList(tournamentData)
    setCurrentTournament(tournamentData)
  }, [])

  useEffect(() => {
    setCurrentTournament(tournament)
  }, [tournament])

  return (
    <section className="border h-full rounded-lg overflow-auto">
      <Table>
      <TableCaption>Lista de los torneos creados</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Genero</TableHead>
          <TableHead>Sub-categoría</TableHead>
          <TableHead>Nombre contacto</TableHead>
          <TableHead>Numero de contacto</TableHead>
          <TableHead>Acciones</TableHead>
          <TableHead>Editar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentTournament.map((team) => (
          <TableRow key={team.id}>
            <TableCell>{team.name}</TableCell>
            <TableCell>{team.value}</TableCell>
            <TableCell>{team.nombre_categoria}</TableCell>
            <TableCell>{team.nombre_genero}</TableCell>
            <TableCell>{team.sub_categoria}</TableCell>
            <TableCell>{team.contact_name}</TableCell>
            <TableCell>{team.contact_number}</TableCell>
            <TableCell className="flex justify-center items-center">
              <ActionMenuTournament tournament={team} />
            </TableCell>
            <TableCell>
              <BottomEditTournament leagueId={team.id} tournamentId={team.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </section>
  )
}

export default ComponentListTournament

/**
 * const [dataTournament, setDataTournament] = useState<Tournament[]>([])
  useEffect(() => {
    const fetchTournament = async () => {
      const result = await fetch(`/api/tournament/${leagueId}`, {
        method: 'GET'
      })
      if (!result.ok) {
        throw new Error('Error al obtener los torneos')
      }
      const data = await result.json()
      setDataTournament(data.result)
    }
    fetchTournament()
  }, [])
 */
