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

interface Props {
  tournamentData: Tournament[]
}

const TableListTournament = ({ tournamentData }: Props) => {
  return (
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {tournamentData.map(
                (team) => (
                  <TableRow key={team.id}>
                    <TableCell>{team.name}</TableCell>
                    <TableCell>{team.value}</TableCell>
                    <TableCell>{team.nombre_categoria}</TableCell>
                    <TableCell>{team.nombre_genero}</TableCell>
                    <TableCell>{team.sub_categoria}</TableCell>
                    <TableCell>{team.contact_name}</TableCell>
                    <TableCell>{team.contact_number}</TableCell>
                    <TableCell>
                      <ActionMenuTournament tournament={team} />
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
  )
}

export default TableListTournament
