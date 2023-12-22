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
  isOpen: boolean | undefined
  idUser: string
}

type LeagueData = Output<typeof LeagueSchema>

async function Fetch (
  formData: any,
  isEdit: boolean,
  idUser?: string,
  informationLeague?: any
) {
  const result = await fetch('/api/league', {
    method: 'POST',
    body: JSON.stringify({ formData, idUser, isEdit, informationLeague })
  })
  if (!result.ok) {
    throw new Error(result.statusText)
  }
  return await result.json()
}

const ModalCreateLeague = ({ league, isEdit, isOpen, idUser }: Props) => {
  const [formData, setFormData] = useState<LeagueData>({
    nameLeague: '',
    imageLeague: ''
  })
  const [getLeague] = useSupabaseStore((state) => [state.getLeague])
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
    }
  }, [league])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      parse(LeagueSchema, formData)
      setBlock(true)
      chargeImageSupabase(imageLeague, extensionImage, 'imageLeague')
      // const id = session?.user.id
      toast.promise(Fetch(formData, isEdit, idUser, league), {
        loading: 'Creando la liga, un momento por favor...',
        success: () => {
          getLeague()
          setTimeout(() => {
            setBlock(false)
            // handleCreateLeague()
          }, 2000)
          return 'Liga creada con éxito'
        },
        error: 'No se pudo crear la liga, comuníquese con el administrador'
      })
    } catch (error: any) {
      toast.error(error.message)
      setBlock(false)
    }
  }

  return (
    <Dialog open={isOpen}>
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

/**
 * <Modal backdrop="blur" isOpen={true} hideCloseButton={league.id === '' ?? true}>
      <ModalContent>
        {(onClose) => (
          <>
          <form onSubmit={(e) => { handleSubmit(e) }}>
          <ModalHeader className="flex flex-col gap-1">
              Acción Requerida
            </ModalHeader>
            <ModalBody>
              <p>
                El sistema no detecta una liga registrada por usted, por favor
                antes de continuar se debe agregar una liga,
              </p>
              <LeagueContainer
                formData={formData}
                handleChargeImage={handleChargeImage}
                setFormData={setFormData}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={() => {
              }} isDisabled={league.id === '' ?? true}>
                Close
              </Button>
              <Button
                color="primary"
                variant="ghost"
                className="hover:text-white"
                type="submit"
                isDisabled={isBlock}
              >
                Enviar
              </Button>
            </ModalFooter>
          </form>
          </>
        )}
      </ModalContent>
    </Modal>
 */
