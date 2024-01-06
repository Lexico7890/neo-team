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

interface Props {
  currentSanction: Sanction[]
}

const TableSanctionList = ({ currentSanction }: Props) => {
  return (
    <Table>
      <TableCaption>Sanciones creadas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentSanction.map(({ name, id, value, description }) => (
          <TableRow key={id}>
            <TableCell>{name}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableSanctionList
