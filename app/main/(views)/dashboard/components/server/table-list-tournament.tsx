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

interface Props {
  tournamentData: Tournament[]
}

const TableListTournament = ({ tournamentData }: Props) => {
  return (
    <>
      {tournamentData.length === 0
        ? (
        <div className="h-full flex justify-center items-center text-3xl font-extrabold">
          <p className="text-center">No hay torneos creados hasta el momento</p>
        </div>
          )
        : (
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
            {tournamentData.map((team) => (
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
                  <BottomEditTournament
                    leagueId={team.id}
                    tournamentId={team.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
          )}
    </>
  )
}

export default TableListTournament
