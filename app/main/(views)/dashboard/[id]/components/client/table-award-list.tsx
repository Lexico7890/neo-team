'use client'

import { type Award } from '@/app/types/award'
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
  currentAward: Award[]
  setKeepDelete: (value: boolean) => void
  setSelectedId: (value: string) => void
  setDeleteTable: (value: 'award' | 'sanction') => void
}

const TableAwardList = ({
  currentAward,
  setKeepDelete,
  setSelectedId,
  setDeleteTable
}: Props) => {
  const handleMouseDown = (id: string) => {
    setDeleteTable('award')
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
      <TableCaption>Premiaciones creadas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Eliminar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentAward.map(({ name, id, value }) => (
          <TableRow key={id}>
            <TableCell>{name}</TableCell>
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

export default TableAwardList
