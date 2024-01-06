'use client'

import InputCustomize from '@/app/components/client/input-customize'
import { AwardSchema, type AwardData } from '@/app/types/schema/award-schema'
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
import { useState } from 'react'
import { toast } from 'sonner'
import { parse } from 'valibot'

interface Props {
  id: string
}

async function Fetch (formData: AwardData, tournamentId: string) {
  const result = await fetch('/api/award', {
    method: 'POST',
    body: JSON.stringify({ formData, tournamentId })
  })
  if (!result.ok) {
    throw new Error(result.statusText)
  }
  return await result.json()
}

const SheetAward = ({ id }: Props) => {
  const [isBlocking, setIsBlocking] = useState<boolean>(false)
  const [setAward] = useSupabaseStore((state) => [state.setAward])
  const [formData, setFormData] = useState<AwardData>({
    nameAward: '',
    value: 0
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setIsBlocking(true)
      parse(AwardSchema, formData)
      toast.promise(Fetch(formData, id), {
        loading: 'Creando la premiación, un momento por favor...',
        success: (data) => {
          console.log('data ', data)
          setAward(data.result[0])
          setFormData({
            nameAward: '',
            value: 0
          })
          setIsBlocking(false)
          return 'Premiación creada con éxito'
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
      <SheetTrigger>Premiación</SheetTrigger>
      <SheetContent>
        <form
          onSubmit={(event) => {
            handleSubmit(event)
          }}
          className="flex flex-col gap-4"
        >
          <SheetHeader>
            <SheetTitle>Administrar premiación</SheetTitle>
          </SheetHeader>
          <SheetDescription>
            Agrega los diferentes premios que se entregaran en este torneo
          </SheetDescription>
          <div>
            <InputCustomize name="Nombre del premio" type="text">
              <Input
                name="nameAward"
                type="text"
                value={formData.nameAward}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    nameAward: event.target.value
                  })
                }}
              />
            </InputCustomize>
          </div>
          <div>
            <InputCustomize name="Valor del premio" type="text">
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
          <Button type="submit" disabled={isBlocking}>Agregar premio</Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default SheetAward
