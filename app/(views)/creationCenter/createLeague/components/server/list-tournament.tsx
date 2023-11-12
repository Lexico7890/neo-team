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
}

const ListTournament = ({ tournament }: Props) => {
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
          ({
            id,
            name,
            value,
            nombre_categoria: nombreCategoría,
            nombre_genero: nombreGenero,
            sub_categoria: variant,
            contact_number: contactNumber
          }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>{value}</TableCell>
              <TableCell>{nombreCategoría}</TableCell>
              <TableCell>{variant}</TableCell>
              <TableCell>{nombreGenero}</TableCell>
              <TableCell>{contactNumber}</TableCell>
              <TableCell>
                <Button variant="solid" color="warning">
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
