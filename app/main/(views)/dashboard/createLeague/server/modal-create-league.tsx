'use client'

import React, { memo, useEffect, useState } from 'react'
import LeagueContainer from '../client/league-container'
import {
  object,
  string,
  type Output,
  minLength,
  maxLength,
  parse
} from 'valibot'
import { Toaster, toast } from 'sonner'
import { type League } from '@/app/types/league'
import { useSupabaseStore } from '@/app/zustand/store'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import useChargeImageSupabase from '@/app/hooks/useChargeImageSupabase'

const LeagueSchema = object({
  nameLeague: string('Debe agregar un nombre a la liga', [
    minLength(3, 'El nombre de la liga debe contener al menos 3 caracteres'),
    maxLength(50, 'El nombre de la liga debe contener menos de 50 caracteres')
  ]),
  imageLeague: string('Debe agregar una imagen a la liga')
})

interface Props {
  league: League
  isEdit: boolean
  idUser: string
}

type LeagueData = Output<typeof LeagueSchema>

async function Fetch (
  formData: any,
  idUser: string,
  imageUrl?: any
) {
  const result = await fetch('/api/league', {
    method: 'POST',
    body: JSON.stringify({ formData, idUser, imageUrl })
  })
  if (!result.ok) {
    throw new Error(result.statusText)
  }
  return await result.json()
}

async function FetchEdit (
  formData: any,
  idUser: string,
  imageUrl?: any
) {
  console.log(formData, imageUrl)
  /* const result = await fetch('/api/league', {
    method: 'POST',
    body: JSON.stringify({ formData, idUser, isEdit, informationLeague })
  })
  if (!result.ok) {
    throw new Error(result.statusText)
  }
  return await result.json() */
}

const ModalCreateLeague = ({ league, isEdit, idUser }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [formData, setFormData] = useState<LeagueData>({
    nameLeague: '',
    imageLeague: ''
  })
  const [setLeague, resetLeague] = useSupabaseStore((state) => [state.setLeague, state.resetLeague])
  const [imageLeague, setImage] = useState<File | undefined>()
  const [extensionImage, setExtensionImage] = useState<string | undefined>('')
  const [isBlock, setBlock] = useState<boolean>(false)

  const { chargeImageSupabase } = useChargeImageSupabase()

  const handleChargeImage = (image?: File, extension?: string) => {
    setImage(image)
    setExtensionImage(extension)
  }

  useEffect(() => {
    if (league !== undefined) {
      setFormData({
        nameLeague: league.name,
        imageLeague: league.url_image ?? ''
      })
      setLeague(league)
    } else {
      resetLeague()
      setOpen(true)
    }
  }, [league])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      parse(LeagueSchema, formData)
      setBlock(true)
      const url = await chargeImageSupabase(imageLeague, extensionImage, 'imageLeague')
      toast.promise(isEdit ? FetchEdit(formData, idUser, url) : Fetch(formData, idUser, url), {
        loading: 'Creando la liga, un momento por favor...',
        success: (data) => {
          setLeague(data.result[0])
          setOpen(false)
          setBlock(false)
          return 'Liga creada con éxito'
        },
        error: (err) => {
          setBlock(false)
          throw new Error(err)
        }
      })
    } catch (error: any) {
      toast.error(error.message)
      setBlock(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button variant="outline">Mi Liga</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isEdit ? 'Editar ' : 'Crear '}Liga
          </DialogTitle>
          <DialogDescription>
            Aquí podrás crear y actualiza los datos de tu liga como la imagen y
            el nombre
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
        <div>
          <LeagueContainer
            formData={formData}
            handleChargeImage={handleChargeImage}
            setFormData={setFormData}
          />
        </div>
        <DialogFooter>
          <Button disabled={isBlock}>
            Enviar
          </Button>
        </DialogFooter>
        </form>
      </DialogContent>
      <Toaster richColors position="top-left"/>
    </Dialog>
  )
}

export default memo(ModalCreateLeague)
