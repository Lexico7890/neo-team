import { type Tournament } from '@/app/types/tournament'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'

interface Props {
  tournament: Tournament[]
  showMore: (item: Tournament) => void
}

const ListTournament = ({ tournament, showMore }: Props) => {
  return (
    <Table aria-label="Tabla de información de las ligas">
      <TableHeader>
        <TableColumn>NOMBRE</TableColumn>
        <TableColumn>VALOR</TableColumn>
        <TableColumn>CATEGORÍA</TableColumn>
        <TableColumn>SUB CATEGORÍA</TableColumn>
        <TableColumn>GENERO</TableColumn>
        <TableColumn>TEL. CONTACTO</TableColumn>
        <TableColumn>ACCIONES</TableColumn>
      </TableHeader>
      <TableBody emptyContent={'No hay torneos creados en el momento'}>
        {tournament.map(
          (item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.value}</TableCell>
              <TableCell>{item.nombre_categoria}</TableCell>
              <TableCell>{item.sub_categoria}</TableCell>
              <TableCell>{item.nombre_genero}</TableCell>
              <TableCell>{item.contact_number}</TableCell>
              <TableCell>
                <Button variant="ghost" color="warning" onClick={() => { showMore(item) }}>
                  Ver mas
                </Button>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  )
}

export default ListTournament
