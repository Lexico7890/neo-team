'use client'

import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { useState } from 'react'

interface Props {
  award: [{ name: string, value: number }]
  setAward: (award: any) => void
}

const AwardTournament = ({ award, setAward }: Props) => {
  const [nameAward, setName] = useState<string>('')
  const [value, setValue] = useState<string>('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (award === undefined) {
      setAward([{ name: nameAward, value: Number(value) }])
    } else {
      setAward((prev: any) => [
        ...prev,
        { name: nameAward, value: Number(value) }
      ])
    }
    setName('')
    setValue('')
  }

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value
    setName(target)
  }

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value
    setValue(target)
  }
  return (
    <div className="border-1 border-black p-2">
      <h3 className="text-base m-2">Premiación</h3>
      <div
        className="flex gap-2 flex-col "
      >
        <Input
          name="name"
          type="text"
          variant="bordered"
          label="Nombre premiación"
          value={nameAward}
          onChange={(e) => {
            handleChangeName(e)
          }}
        />
        <Input
          type="number"
          label="Valor premio"
          placeholder="0.00"
          name="value"
          value={value}
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
          onChange={(e) => {
            handleChangeValue(e)
          }}
        />
        <Button size="sm" variant="bordered" type="submit" onClick={(event) => {
          handleSubmit(event)
        }}>
          Agregar
        </Button>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Nombre premio</TableColumn>
          <TableColumn>Valor</TableColumn>
        </TableHeader>
        <TableBody>
          {award.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item?.name}</TableCell>
              <TableCell>${item?.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AwardTournament
