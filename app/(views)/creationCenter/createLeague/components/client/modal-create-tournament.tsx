'use client'

import { Button, Modal, ModalContent } from '@nextui-org/react'
import React, { useState } from 'react'
import { FaRegWindowClose } from 'react-icons/fa'
import TournamentContainer from './tournament-container'
import { Toaster, toast } from 'sonner'
import { type Award } from '@/app/types/award'
import { parse } from 'valibot'
import { type TournamentData, TournamentSchema } from '@/app/types/schema/tournament-schema'
import { INIT_FORM_DATA } from '@/app/data/constant'
import { type Category } from '@/app/types/category'
import { type Gender } from '@/app/types/gender'
import { type SubCategory } from '@/app/types/sub-category'

interface Props {
  leagueId: string
  isOpen: boolean
  category: Category[]
  gender: Gender[]
  subCategory: SubCategory[]
  onClose: () => void
  onOpenChange: (open: boolean) => void
}

async function Fetch (formData: any, award: any, idLeague: string) {
  const result = await fetch('/api/tournament', {
    method: 'POST',
    body: JSON.stringify({ formData, award, idLeague })
  })
  if (!result.ok) {
    throw new Error(result.statusText)
  }
  return await result.json()
}

const ModalCreateTournament = ({ leagueId, isOpen, category, gender, subCategory, onClose, onOpenChange }: Props) => {
  const [award, setAward] = useState<Award[]>([])
  const [formData, setFormData] = useState<TournamentData>(INIT_FORM_DATA)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (award.length < 1) {
        throw new Error(
          'Se debe agregar por lo menos un item en la premiación'
        )
      }
      parse(TournamentSchema, formData)
      toast.promise(Fetch(formData, award, leagueId), {
        loading: 'Creando la liga, un momento por favor...',
        success: () => {
          return 'Liga creada con éxito'
        },
        error: 'No se pudo crear la liga, comuníquese con el administrador'
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop='opaque' size='5xl' onOpenChange={onOpenChange} hideCloseButton={false}>
      <ModalContent>
      {(onClose) => (
        <div className="border-1 border-black dark:border-white w-full p-2 sm:p-10">
        <form
          onSubmit={(event) => {
            handleSubmit(event)
          }}
        >
          <h3 className="text-lg my-4">
            Crear Torneo
          </h3>
          <TournamentContainer
            award={award}
            category={category}
            formData={formData}
            gender={gender}
            setAward={setAward}
            setFormData={setFormData}
            subCategory={subCategory}
          />
          <Button
            color="primary"
            variant="ghost"
            className="hover:text-white my-4"
            type="submit"
          >
            Enviar
          </Button>
        </form>
        <Toaster richColors />
      </div>
      )}
      </ModalContent>
    </Modal>
  )
}

export default ModalCreateTournament

/** */
