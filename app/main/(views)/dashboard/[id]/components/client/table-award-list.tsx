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

interface Props {
  currentAward: Award[]
}

const TableAwardList = ({ currentAward }: Props) => {
  return (
    <Table>
      <TableCaption>Premiaciones creadas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentAward.map(({ name, id, value }) => (
          <TableRow key={id}>
            <TableCell>{name}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableAwardList
