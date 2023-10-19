'use client'

import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from '@nextui-org/react'
import { type Info } from '../types/commonType'

interface Props {
  info: Info[]
}

export default function CustomTable ({ info }: Props) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NOMBRE</TableColumn>
        <TableColumn>PJ</TableColumn>
        <TableColumn>PG</TableColumn>
        <TableColumn>PE</TableColumn>
        <TableColumn>PP</TableColumn>
        <TableColumn>GF</TableColumn>
        <TableColumn>GC</TableColumn>
        <TableColumn>GD</TableColumn>
      </TableHeader>
      <TableBody>
        {info.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.gamePlayed}</TableCell>
            <TableCell>{item.wonGames}</TableCell>
            <TableCell>{item.tiedGames}</TableCell>
            <TableCell>{item.lostGames}</TableCell>
            <TableCell>{item.goalsFavor}</TableCell>
            <TableCell>{item.goalsAgainst}</TableCell>
            <TableCell>{item.goalDifference}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
