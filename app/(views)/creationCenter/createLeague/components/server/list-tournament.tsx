import { type Tournament } from '@/app/types/tournament'
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'

interface Props {
  tournament: Tournament[]
}

const ListTournament = ({ tournament }: Props) => {
  console.log(tournament)
  return (
    <Table aria-label="Tabla de información de las ligas">
      <TableHeader>
        <TableColumn>NOMBRE</TableColumn>
        <TableColumn>VALOR</TableColumn>
        <TableColumn>CATEGORÍA</TableColumn>
        <TableColumn>GENERO</TableColumn>
        <TableColumn>NOMBRE CONTACTO</TableColumn>
        <TableColumn>TEL. CONTACTO</TableColumn>
        <TableColumn>ACCIONES</TableColumn>
      </TableHeader>
      <TableBody emptyContent={'No hay torneos creados en el momento'}>
        {tournament.map(({ id, name, value, category, gender, contact_name: contactName, contact_number: contactNumber }) => (
          <TableRow key={id}>
            <TableCell>{name}</TableCell>
            <TableCell>{value}</TableCell>
            <TableCell>{category}</TableCell>
            <TableCell>{gender}</TableCell>
            <TableCell>{contactName}</TableCell>
            <TableCell>{contactNumber}</TableCell>
            <TableCell>
              <Button>
                información
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ListTournament
