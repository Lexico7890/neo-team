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

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    setAward((prev: Array<{ name: string, value: number }>) => [
      ...prev,
      { name: nameAward, value: Number(value) }
    ])
    setName('')
    setValue('')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (name === 'nameAward') {
      setName(value)
    } else if (name === 'value') {
      setValue(value)
    }
  }

  return (
    <div className="border-1 border-black p-2">
        <h3 className="text-base m-2">Premiación</h3>
        <div className="flex gap-2 flex-col ">
          <Input
            name="nameAward"
            type="text"
            variant="bordered"
            label="Nombre premiación"
            value={nameAward}
            onChange={(e) => {
              handleChange(e)
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
              handleChange(e)
            }}
          />
          <Button
            size="sm"
            variant="bordered"
            onClick={(e) => { handleSubmit(e) }}
          >
            Agregar
          </Button>
        </div>
      <Table
        aria-label="Table for award tournament"
        isHeaderSticky
        classNames={{
          base: 'max-h-[200px] overflow-auto',
          table: 'min-h-[80px]'
        }}
      >
        <TableHeader>
          <TableColumn>Nombre premio</TableColumn>
          <TableColumn>Valor</TableColumn>
          <TableColumn>Eliminar</TableColumn>
        </TableHeader>
        <TableBody>
          {award.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item?.name}</TableCell>
              <TableCell>${item?.value}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const updatedAward = [...award]
                    updatedAward.splice(index, 1)
                    setAward(updatedAward)
                  }}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AwardTournament
