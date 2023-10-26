'use client'

import { type ChangeEvent, useState } from 'react'
import CardCreation from '../components/card-creation'
import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea
} from '@nextui-org/react'
import AwardTournament from '../components/award-tournament'
import {
  minLength,
  object,
  type Output,
  parse,
  string,
  maxLength,
  number,
  minValue

} from 'valibot'
import { toast, Toaster } from 'sonner'
import useGetSupabase from '@/app/hooks/useGetSupabase'
import { createClient } from '@supabase/supabase-js'

const LeagueSchema = object({
  nameLeague: string('Debe agregar un nombre a la liga', [
    minLength(3, 'El nombre de la liga debe contener al menos 3 caracteres'),
    maxLength(50, 'El nombre de la liga debe contener menos de 50 caracteres')
  ]),
  nameTournament: string('Debe agregar un nombre al torneo', [
    minLength(3, 'El nombre del torneo debe contener al menos 3 caracteres'),
    maxLength(50, 'El nombre del torneo debe contener menos de 50 caracteres')
  ]),
  valueTournament: number('Debe agregar un valor de inscripción al torneo', [
    minValue(1, 'El valor debe ser mayor a 0')
  ]),
  description: string('Debe agregar una descripción al torneo', [
    minLength(10, 'La descripción debe contener al menos 10 caracteres'),
    maxLength(500, 'El nombre debe contener menos de 50 caracteres')
  ]),
  category: string('Debe seleccionar una categoría'),
  gender: string('Debe seleccionar un genero'),
  variant: string('Debe seleccionar una sub categoría'),
  contactName: string('Debe agregar un nombre al contacto', [
    minLength(3, 'El nombre del contacto debe contener al menos 3 caracteres'),
    maxLength(
      50,
      'El nombre del contacto debe contener menos de 50 caracteres'
    )
  ]),
  contactNumber: string('Debe agregar un numero de contacto', [
    minLength(7, 'Numero de contacto invalido'),
    maxLength(10, 'Numero de contacto invalido')
  ])
})

type LeagueData = Output<typeof LeagueSchema>

async function Fetch (formData: any, award: any, idUser: string | undefined) {
  const result = await fetch('/api/league', {
    method: 'POST',
    body: JSON.stringify({ formData, award, idUser })
  })
  if (!result.ok) {
    console.error('Upsssss, Algo estuvo mal')
  }
  return await result.json()
}

const PageCreateLeague = () => {
  const [formData, setFormData] = useState<LeagueData>({
    nameLeague: '',
    nameTournament: '',
    valueTournament: 0,
    description: '',
    category: '',
    gender: '',
    variant: '',
    contactName: '',
    contactNumber: ''
  })
  const [award, setAward] = useState<[{ name: string, value: number }]>(
    [] as any
  )
  const [imageLeague, setImage] = useState<File | undefined>(undefined)

  const { category, gender, session, subCategory } = useGetSupabase()
  // const supabase = createClient()

  const handleChargeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const file: File = (target.files as FileList)[0]
    if (file instanceof File) {
      setImage(file)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (award.length < 1) {
        throw new Error(
          'Se debe agregar por lo menos un item en la premiación'
        )
      }
      parse(LeagueSchema, formData)
      if (imageLeague !== undefined) {
        const { data, error } = await supabase.storage.from('image_neo_team').upload('image_test.jpg', imageLeague)
        if (error !== null) {
          console.log(error)
          throw new Error('No se pudo cargar la imagen ', error)
        }
        console.log(data)
      }
      // const id = session?.user.id
      /* toast.promise(Fetch(formData, award, id), {
        loading: 'Creando la liga, un momento por favor...',
        success: 'Liga creada con éxito',
        error: 'No se pudo crear la liga, comuníquese con el administrador'
      }) */
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex gap-10 h-auto">
      <div className="hidden md:block">
        <CardCreation
          title="Crear Liga"
          urlImage="/image/imageLeague.jpg"
          height={300}
          width={300}
          isThereButton={false}
          path={null}
        />
      </div>
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-2xl">Creación de ligas</h1>
        <div className="border-1 border-black w-full p-2 sm:p-10">
          <h3 className="text-lg my-4">Información de liga</h3>
          <form
            onSubmit={(event) => {
              handleSubmit(event)
            }}
          >
            <div className="gridFormat">
              <Input
                isRequired
                type="text"
                variant="bordered"
                label="Nombre de la liga"
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    nameLeague: event.target.value
                  })
                }}
              />
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Cargar imagen de liga
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  onChange={(e) => {
                    handleChargeImage(e)
                  }}
                />
              </div>
            </div>
            <Divider className="my-4" />
            <h3 className="text-lg my-4">Crear Torneo</h3>
            <div className="gridFormat">
              <div className="flex flex-col gap-2">
                <Input
                  isRequired
                  type="text"
                  variant="bordered"
                  label="Nombre de torneo"
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      nameTournament: event.target.value
                    })
                  }}
                />
                <Input
                  type="number"
                  label="Valor del torneo"
                  placeholder="0.00"
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      valueTournament: Number(event.target.value)
                    })
                  }}
                />
                <Textarea
                  label="Description"
                  variant="bordered"
                  placeholder="Estos datos se mostraran en la descripción del torneo, habla de los mas importante"
                  className="max-w-full"
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      description: event.target.value
                    })
                  }}
                />
                <Select
                  label="Seleccione la categoría"
                  className="max-w-full"
                  isRequired
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      category: event.target.value
                    })
                  }}
                >
                  {category !== null
                    ? (
                        category.map(({ id, name }) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                        ))
                      )
                    : (
                    <Select>
                      <span>Sin datos</span>
                    </Select>
                      )}
                </Select>
                <Select
                  label="Seleccione el genero"
                  className="max-w-full"
                  isRequired
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      gender: event.target.value
                    })
                  }}
                >
                  {gender !== null
                    ? (
                        gender.map(({ id, name }) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                        ))
                      )
                    : (
                    <Select>
                      <span>Sin datos</span>
                    </Select>
                      )}
                </Select>
                <Select
                  label="Seleccione una sub categoría"
                  className="max-w-full"
                  isRequired
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      variant: event.target.value
                    })
                  }}
                >
                  {subCategory !== null
                    ? (
                        subCategory.map(({ id, name }) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                        ))
                      )
                    : (
                    <Select>
                      <span>Sin datos</span>
                    </Select>
                      )}
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <AwardTournament award={award} setAward={setAward} />
                <Input
                  isRequired
                  type="text"
                  variant="bordered"
                  label="Nombre de contacto"
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      contactName: event.target.value
                    })
                  }}
                />
                <Input
                  isRequired
                  type="tel"
                  variant="bordered"
                  label="Numero de teléfono de contacto"
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      contactNumber: event.target.value
                    })
                  }}
                />
              </div>
            </div>
            <Button
              color="primary"
              variant="ghost"
              className="hover:text-white my-4"
              type="submit"
            >
              Crear liga
            </Button>
          </form>
          <Toaster richColors />
        </div>
      </div>
    </div>
  )
}

export default PageCreateLeague
