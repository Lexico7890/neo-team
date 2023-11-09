'use client'

import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader
} from '@nextui-org/react'
import React, { useState } from 'react'
import LeagueContainer from '../client/league-container'
import { object, string, type Output, minLength, maxLength, parse } from 'valibot'
import { Toaster, toast } from 'sonner'
import useGetSupabase from '@/app/hooks/useGetSupabase'

const LeagueSchema = object({
  nameLeague: string('Debe agregar un nombre a la liga', [
    minLength(3, 'El nombre de la liga debe contener al menos 3 caracteres'),
    maxLength(50, 'El nombre de la liga debe contener menos de 50 caracteres')
  ]),
  imageLeague: string('Debe agregar una imagen a la liga')
})

interface Props {
  isOpen: boolean
}

type LeagueData = Output<typeof LeagueSchema>

async function Fetch (formData: any, idUser?: string) {
  console.log(formData)
  const result = await fetch('/api/league', {
    method: 'POST',
    body: JSON.stringify({ formData, idUser })
  })
  if (!result.ok) {
    throw new Error(result.statusText)
  }
  return await result.json()
}

const ModalCreateLeague = ({ isOpen }: Props) => {
  const [formData, setFormData] = useState<LeagueData>({
    nameLeague: '',
    imageLeague: ''
  })
  const [imageLeague, setImage] = useState<File | undefined>()
  const [extensionImage, setExtensionImage] = useState<string | undefined>('')

  const { session, supabase } = useGetSupabase()

  const handleChargeImage = (image?: File, extension?: string) => {
    setImage(image)
    setExtensionImage(extension)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('ima ', imageLeague)
    try {
      parse(LeagueSchema, formData)
      if (imageLeague !== undefined) {
        const { data, error } = await supabase.storage
          .from('image_neo_team/imageLeague')
          .upload(
            `image_${Date.now().toString()}.${extensionImage}`,
            imageLeague
          )
        if (error !== null) {
          throw new Error('No se pudo cargar la imagen ', error)
        }
        const { data: url } = supabase.storage
          .from('image_neo_team/imageLeague')
          .getPublicUrl(data.path)
        formData.imageLeague = url.publicUrl
      }
      const id = session?.user.id
      toast.promise(Fetch(formData, id), {
        loading: 'Creando la liga, un momento por favor...',
        success: 'Liga creada con éxito',
        error: 'No se pudo crear la liga, comuníquese con el administrador'
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <Modal backdrop="blur" isOpen={isOpen}>
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
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                variant="ghost"
                className="hover:text-white"
                type="submit"
              >
                Enviar
              </Button>
            </ModalFooter>
          </form>
          <Toaster richColors position="top-left"/>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalCreateLeague
