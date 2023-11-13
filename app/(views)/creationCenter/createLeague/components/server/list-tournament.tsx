import { type Tournament } from '@/app/types/tournament'
import {
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip
} from '@nextui-org/react'
import { RiEdit2Fill } from 'react-icons/ri'
import { MdPreview } from 'react-icons/md'
import { useRouter } from 'next/navigation'

interface Props {
  tournament: Tournament[]
  showMore: (item: Tournament) => void
}

const ListTournament = ({ tournament, showMore }: Props) => {
  const router = useRouter()
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
        {tournament.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.value}</TableCell>
            <TableCell>{item.nombre_categoria}</TableCell>
            <TableCell>{item.sub_categoria}</TableCell>
            <TableCell>{item.nombre_genero}</TableCell>
            <TableCell>{item.contact_number}</TableCell>
            <TableCell>
              <ButtonGroup>
                <Tooltip content="Ver mas">
                  <Button
                    isIconOnly
                    variant="ghost"
                    color="success"
                    onClick={() => {
                      showMore(item)
                    }}
                  >
                    <MdPreview />
                  </Button>
                </Tooltip>
                <Tooltip content="Editar">
                  <Button
                    isIconOnly
                    variant="ghost"
                    color="warning"
                    onClick={() => {
                      router.push(`/creationCenter/createLeague/${item.id}`)
                    }}
                  >
                    <RiEdit2Fill />
                  </Button>
                </Tooltip>
              </ButtonGroup>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ListTournament
