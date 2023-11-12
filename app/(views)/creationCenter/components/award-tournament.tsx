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
import { RiDeleteBin4Line } from 'react-icons/ri'
import {
  type Output,
  maxLength,
  minLength,
  minValue,
  number,
  object,
  string,
  parse
} from 'valibot'

interface Props {
  award: [{ name: string, value: number }]
  setAward: (award: any) => void
}

const AwardSchema = object({
  nameAward: string('Debe agregar un nombre a la premiación', [
    minLength(3, 'El nombre de la liga debe contener al menos 3 caracteres'),
    maxLength(50, 'El nombre de la liga debe contener menos de 50 caracteres')
  ]),
  value: number('Debe agregar un valor a la premiación', [
    minValue(1, 'El valor debe ser mayor a 0')
  ])
})

type AwardData = Output<typeof AwardSchema>

const AwardTournament = ({ award, setAward }: Props) => {
  const [formData, setFormData] = useState<AwardData>({
    nameAward: '',
    value: 0
  })
  const [showError, setShowError] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>('')

  const handleSubmit = () => {
    setAward((prev: Array<{ name: string, value: number }>) => [
      ...prev,
      { name: formData.nameAward, value: formData.value }
    ])
  }

  const handleSubmitForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    try {
      parse(AwardSchema, formData)
      setShowError(false)
      handleSubmit()
    } catch (error: any) {
      setMessageError(error.message)
      setShowError(true)
    }
  }

  return (
    <div className="border-1 border-black dark:border-white p-2">
      <h3 className="text-base m-2">Premiación</h3>
      <div className="flex gap-2 flex-col ">
          <Input
            name="nameAward"
            type="text"
            variant="bordered"
            label="Nombre premiación"
            value={formData.nameAward}
            onChange={(event) => {
              setFormData({
                ...formData,
                nameAward: event.target.value
              })
            }}
          />
          <Input
            type="number"
            label="Valor premio"
            placeholder="0.00"
            name="value"
            value={formData.value.toString()}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            onChange={(event) => {
              setFormData({
                ...formData,
                value: Number(event.target.value)
              })
            }}
          />
          {showError && <span className='text-xs text-red-400'>{messageError}</span>}
          <Button
            size="sm"
            variant="bordered"
            type="submit"
            onClick={(event) => { handleSubmitForm(event) }}
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
                  isIconOnly
                  color="danger"
                  onClick={() => {
                    const updatedAward = [...award]
                    updatedAward.splice(index, 1)
                    setAward(updatedAward)
                  }}
                >
                  <RiDeleteBin4Line />
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
