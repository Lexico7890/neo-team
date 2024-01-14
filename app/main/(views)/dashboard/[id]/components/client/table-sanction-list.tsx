'use client'

import { type Sanction } from '@/app/types/sanction'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import ButtonDeleteItem from './button-delete-item'

interface Props {
  currentSanction: Sanction[]
  setKeepDelete: (value: boolean) => void
  setSelectedId: (value: string) => void
  setDeleteTable: (value: 'award' | 'sanction') => void
}

const TableSanctionList = ({
  currentSanction, setKeepDelete,
  setSelectedId,
  setDeleteTable
}: Props) => {
  const handleMouseDown = (id: string) => {
    setDeleteTable('sanction')
    setSelectedId(id)
    setKeepDelete(true)
  }

  const handleMouseUpCapture = () => {
    setKeepDelete(false)
  }

  const handleMouseLeave = () => {
    setKeepDelete(false)
  }
  return (
    <Table>
      <TableCaption>Sanciones creadas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Eliminar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentSanction.map(({ name, id, value, description }) => (
          <TableRow key={id}>
            <TableCell>{name}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>{value}</TableCell>
            <TableCell>
              <ButtonDeleteItem
                handleMouseDown={() => {
                  handleMouseDown(id)
                }}
                handleMouseLeave={handleMouseLeave}
                handleMouseUpCapture={handleMouseUpCapture}
                setKeepDelete={setKeepDelete}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableSanctionList
