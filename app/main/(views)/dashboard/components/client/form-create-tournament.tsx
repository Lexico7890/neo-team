'use client'

import CustomTextArea from '@/app/components/client/custom-text-area'
import InputCustomize from '@/app/components/client/input-customize'

import { INIT_FORM_DATA } from '@/app/data/constant'
import useInstanceSupabaseClient from '@/app/hooks/useInstanceSupabaseClient'
import SectionSelectList from '@/app/main/(views)/dashboard/components/client/section-select-list'
import {
  type TournamentData,
  TournamentSchema
} from '@/app/types/schema/tournament-schema'
import { useSupabaseStore } from '@/app/zustand/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { parse } from 'valibot'

interface Props {
  leagueId: string
  setOpen: (value: boolean) => void
  isEdit: boolean
  tournamentId?: string
}

const ComponentList = dynamic(
  async () =>
    await import(
      '@/app/main/(views)/dashboard/components/client/section-select-list'
    )
)

async function Fetch (formData: any, idLeague: string) {
  const result = await fetch('/api/tournament', {
    method: 'POST',
    body: JSON.stringify({ formData, idLeague })
  })
  if (!result.ok) {
    throw new Error(result.statusText)
  }
  return await result.json()
}

async function FetchEdit (formData: any, tournamentId: string | undefined) {
  const result = await fetch('/api/tournament', {
    method: 'PUT',
    body: JSON.stringify({ formData, tournamentId })
  })
  if (!result.ok) {
    throw new Error(result.statusText)
  }
  return await result.json()
}

const FormCreateTournament = ({
  leagueId,
  setOpen,
  isEdit,
  tournamentId
}: Props) => {
  const [formData, setFormData] = useState<TournamentData>(INIT_FORM_DATA)
  const [setTournamentList] = useSupabaseStore((state) => [
    state.setTournamentList
  ])

  const { dataTournament } = useInstanceSupabaseClient(tournamentId)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      parse(TournamentSchema, formData)
      toast.promise(isEdit ? FetchEdit(formData, leagueId) : Fetch(formData, leagueId), {
        loading: 'Creando torneo, un momento por favor...',
        success: (data) => {
          setTournamentList(data.result)
          setOpen(false)
          return 'Torneo creado con éxito'
        },
        error: 'No se pudo crear el torneo, comuníquese con el administrador'
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleSelectCategory = (value: string) => {
    setFormData({
      ...formData,
      category: value
    })
  }

  const handleSelectGender = (value: string) => {
    setFormData({
      ...formData,
      gender: value
    })
  }

  const handleSelectSubCategory = (value: string) => {
    setFormData({
      ...formData,
      subCategory: value
    })
  }

  useEffect(() => {
    if (dataTournament !== undefined) {
      setFormData({
        nameTournament: dataTournament.name,
        description: dataTournament.description,
        contactName: dataTournament.contact_name,
        valueTournament: dataTournament.value,
        category: dataTournament.category,
        contactNumber: dataTournament.contact_number,
        gender: dataTournament.gender,
        subCategory: dataTournament.sub_category,
        state_id: dataTournament.state_id
      })
    }
  }, [dataTournament])

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event)
      }}
      className="flex flex-col gap-4 justify-between"
    >
      <div className="sm:grid sm:grid-cols-2 flex flex-col gap-2">
        <div className="flex flex-col gap-2 justify-center items-center">
          <InputCustomize name="Nombre torneo" type="text">
            <Input
              type="text"
              id="nameTournament"
              placeholder="Mi equipo"
              value={formData.nameTournament}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  nameTournament: event.target.value
                })
              }}
            />
          </InputCustomize>
          <CustomTextArea label="Descripción del torneo" id="description">
            <Textarea
              placeholder="Información sobre el torneo como fechas formato etc..."
              id="description"
              className="h-[175px] resize-none"
              defaultValue={formData.description}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  description: event.target.value
                })
              }}
            />
          </CustomTextArea>
          <InputCustomize name="Nombre de contacto" type="text">
            <Input
              type="text"
              id="nameContact"
              placeholder="Usuario de contacto"
              value={formData.contactName}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  contactName: event.target.value
                })
              }}
            />
          </InputCustomize>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <InputCustomize name="Valor del torneo" type="text">
            <Input
              type="text"
              id="valueTournament"
              placeholder="0.0"
              value={formData.valueTournament}
              onChange={(event) => {
                const enteredValue = event.target.value
                const regex = /^[0-9]*\.?[0-9]*$/
                if (regex.test(enteredValue)) {
                  setFormData({
                    ...formData,
                    valueTournament: Number(enteredValue)
                  })
                }
              }}
            />
          </InputCustomize>
          {isEdit && dataTournament !== undefined
            ? (
            <ComponentList
              dataTournament={dataTournament}
              handleSelectCategory={handleSelectCategory}
              handleSelectGender={handleSelectGender}
              handleSelectSubCategory={handleSelectSubCategory}
            />
              )
            : (
            <SectionSelectList
              handleSelectCategory={handleSelectCategory}
              handleSelectGender={handleSelectGender}
              handleSelectSubCategory={handleSelectSubCategory}
            />
              )}
          <InputCustomize name="Teléfono del contacto" type="text">
            <Input
              type="text"
              id="phoneContact"
              placeholder="xxx-xxxxxxx"
              value={formData.contactNumber}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  contactNumber: event.target.value
                })
              }}
            />
          </InputCustomize>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <Button
          type="submit"
          className="bg-green-400 font-bold hover:bg-green-500"
        >
          Guardar información
        </Button>
      </div>
    </form>
  )
}

export default FormCreateTournament
