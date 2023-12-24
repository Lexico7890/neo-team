'use client'

import CustomTextArea from '@/app/components/client/custom-text-area'
import InputCustomize from '@/app/components/client/input-customize'
import SelectCustomize from '@/app/components/client/select-customize'
import { INIT_FORM_DATA } from '@/app/data/constant'
import { type Category } from '@/app/types/category'
import { type Gender } from '@/app/types/gender'
import {
  type TournamentData,
  TournamentSchema
} from '@/app/types/schema/tournament-schema'
import { type SubCategory } from '@/app/types/sub-category'
import { useSupabaseStore } from '@/app/zustand/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SelectItem } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { parse } from 'valibot'

interface Props {
  leagueId: string
  setOpen: (value: boolean) => void
}

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

const FormCreateTournament = ({ leagueId, setOpen }: Props) => {
  const [formData, setFormData] = useState<TournamentData>(INIT_FORM_DATA)
  const [category, setCategory] = useState<Category[]>([])
  const [gender, setGender] = useState<Gender[]>([])
  const [subCategory, setSubCategory] = useState<SubCategory[]>([])
  const [setTournamentId] = useSupabaseStore((state) => [
    state.setTournamentId
  ])

  const supabase = createClientComponentClient()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      parse(TournamentSchema, formData)
      toast.promise(Fetch(formData, leagueId), {
        loading: 'Creando torneo, un momento por favor...',
        success: (data) => {
          setTournamentId(data.result[0])
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
    const fetchSelects = async () => {
      const { data: dataCategory, error: errorCategory } = await supabase
        .from('category')
        .select('*')
      if (errorCategory != null) {
        throw new Error(errorCategory.message)
      }
      dataCategory !== null && setCategory(dataCategory)
      const { data: dataGender, error: errorGender } = await supabase
        .from('gender')
        .select('*')
      if (errorGender != null) {
        throw new Error(errorGender.message)
      }
      dataGender !== null && setGender(dataGender)
      const { data: dataSubCategory, error: errorSubCategory } = await supabase
        .from('sub_category')
        .select('*')
      if (errorSubCategory != null) {
        throw new Error(errorSubCategory.message)
      }
      console.log('dataSubCategory ', dataSubCategory)
      dataSubCategory !== null && setSubCategory(dataSubCategory)
    }
    fetchSelects()
  }, [])

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
          <SelectCustomize label="Genero" placeholder="Seleccione un genero" handleSelectOption={handleSelectGender}>
            {gender.map(({ name, id }) => (
              <SelectItem value={id} key={id}>
                {name}
              </SelectItem>
            ))}
          </SelectCustomize>
          <SelectCustomize
            label="Categoría"
            placeholder="Seleccione una categoría"
            handleSelectOption={handleSelectCategory}
          >
            {category.map(({ name, id }) => (
              <SelectItem value={id} key={id}>
                {name}
              </SelectItem>
            ))}
          </SelectCustomize>
          <SelectCustomize
          handleSelectOption={handleSelectSubCategory}
            label="Sub-Categoría"
            placeholder="Seleccione una sub-categoría"
          >
            {subCategory.map(({ name, id }) => (
              <SelectItem value={id.toString()} key={id}>
                {name}
              </SelectItem>
            ))}
          </SelectCustomize>
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
