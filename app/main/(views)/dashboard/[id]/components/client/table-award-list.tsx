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
}

const TableAwardList = ({ currentAward }: Props) => {

  const handleDeleteItem () => {
    
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
            <TableCell><ButtonDeleteItem handleClick={handleDeleteItem}/></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableAwardList
