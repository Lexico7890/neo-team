'use client'

import CustomTextArea from '@/app/components/client/custom-text-area'
import InputCustomize from '@/app/components/client/input-customize'
import { INIT_SANCTION_DATA } from '@/app/data/constant'
import { type SanctionData, SanctionSchema } from '@/app/types/schema/sanction-schema'
import { useSupabaseStore } from '@/app/zustand/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { toast } from 'sonner'
import { parse } from 'valibot'

interface Props {
  id: string
}

async function Fetch (formData: SanctionData, tournamentId: string) {
  const result = await fetch('/api/sanction', {
    method: 'POST',
    body: JSON.stringify({ formData, tournamentId })
  })
  if (!result.ok) {
    throw new Error(result.statusText)
  }
  return await result.json()
}

const SheetSanction = ({ id }: Props) => {
  const [formData, setFormData] = useState<SanctionData>(INIT_SANCTION_DATA)
  const [isBlocking, setIsBlocking] = useState<boolean>(false)
  const [setSanction] = useSupabaseStore((state) => [state.setSanction])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setIsBlocking(true)
      parse(SanctionSchema, formData)
      toast.promise(Fetch(formData, id), {
        loading: 'Creando la sanción, un momento por favor...',
        success: (data) => {
          console.log('data ', data)
          setSanction(data.result[0])
          setFormData(INIT_SANCTION_DATA)
          setIsBlocking(false)
          return 'Sanción creada con éxito'
        },
        error: (err) => {
          setIsBlocking(false)
          throw new Error(err)
        }
      })
    } catch (error: any) {
      toast.error(error.message)
      setIsBlocking(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger>Sanciones</SheetTrigger>
      <SheetContent>
        <form
          onSubmit={(event) => {
            handleSubmit(event)
          }}
          className="flex flex-col gap-4"
        >
          <SheetHeader>
            <SheetTitle>Administrar sanciones</SheetTitle>
          </SheetHeader>
          <SheetDescription>
            Aquí podrás informar a los equipos las sanciones que recibirán si no cumplen con el reglamento del torneo
          </SheetDescription>
          <div>
            <InputCustomize name="Nombre de la sanción" type="text">
              <Input
                name="nameSanction"
                type="text"
                value={formData.name}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    name: event.target.value
                  })
                }}
              />
            </InputCustomize>
          </div>
          <div>
          <CustomTextArea label="Descripción de la sanción" id="description">
            <Textarea
              placeholder="Agrega un pequeño resumen sobre la sanción"
              id="description"
              className="h-[175px] resize-none"
              onChange={(event) => {
                setFormData({
                  ...formData,
                  description: event.target.value
                })
              }}
            />
          </CustomTextArea>
          </div>
          <div>
            <InputCustomize name="Valor a pagar por la sanción" type="text">
              <Input
                type="text"
                id="valueAward"
                placeholder="0.0"
                value={formData.value}
                onChange={(event) => {
                  const enteredValue = event.target.value
                  const regex = /^[0-9]*\.?[0-9]*$/
                  if (regex.test(enteredValue)) {
                    setFormData({
                      ...formData,
                      value: Number(enteredValue)
                    })
                  }
                }}
              />
            </InputCustomize>
          </div>
          <Button type="submit" disabled={isBlocking}>Agregar sanción</Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default SheetSanction
