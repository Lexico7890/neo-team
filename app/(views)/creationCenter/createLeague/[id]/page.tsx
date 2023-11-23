'use client'

import { useEffect, useState } from 'react'
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea
} from '@nextui-org/react'
import { INIT_FORM_DATA } from '@/app/data/constant'
import {
  TournamentSchema,
  type TournamentData
} from '@/app/types/schema/tournament-schema'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useSupabaseStore } from '@/app/zustand/store'
import { parse } from 'valibot'
import { Toaster, toast } from 'sonner'
import AwardTournamentEdit from '../../components/award-tournament-edit'

async function FetchTournament (
  formData: any,
  idTournamentEdit: string,
  idLeague: string
) {
  console.log('form ', formData)
  const result = await fetch('/api/tournament', {
    method: 'PUT',
    body: JSON.stringify({ idTournamentEdit, formData, idLeague })
  })
  if (!result.ok) {
    throw new Error(result.statusText)
  }
  return await result.json()
}

const PageTournamentEdit = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const router = useRouter()
  const [formData, setFormData] = useState<TournamentData>(INIT_FORM_DATA)
  const [loadingData, setLoadingData] = useState<boolean>(false)
  const [category, gender, subCategory, tournament, leagueId] =
    useSupabaseStore((state) => [
      state.category,
      state.gender,
      state.subCategory,
      state.tournament,
      state.leagueId
    ])

  const handleSubmitTournament = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      parse(TournamentSchema, formData)
      handleAssignId()
      toast.promise(FetchTournament(formData, id, leagueId.id), {
        loading: 'Modificando torneo, un momento por favor...',
        success: (data) => {
          return 'Torneo modificado con éxito'
        },
        error:
          'No se pudo modificar el torneo, comuníquese con el administrador'
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleAssignId = () => {
    const idCategory = category.find((item) => item.name === formData.category)
    const idGender = gender.find((item) => item.name === formData.gender)
    const idSubCategory = subCategory.find(
      (item) => item.name === formData.variant
    )
    if (
      idCategory !== undefined &&
      idGender !== undefined &&
      idSubCategory !== undefined
    ) {
      formData.category = idCategory?.id
      formData.gender = idGender?.id
      formData.variant = idSubCategory?.id.toString()
    } else {
      // Handle case where one or more IDs couldn't be found
      console.error('One or more IDs not found.')
    }
  }

  useEffect(() => {
    setLoadingData(true)
    const tournamentEdit = tournament.find((item) => item.id === id)
    if (tournamentEdit !== undefined) {
      setFormData({
        nameTournament: tournamentEdit.name,
        valueTournament: tournamentEdit.value,
        description: tournamentEdit.description,
        category: tournamentEdit.nombre_categoria,
        gender: tournamentEdit.nombre_genero,
        variant: tournamentEdit.sub_categoria,
        contactName: tournamentEdit.contact_name,
        contactNumber: tournamentEdit.contact_number
      })
    }
    setTimeout(() => {
      setLoadingData(false)
    }, 1000)
  }, [])

  return (
    <div>
      <Button
        color="warning"
        variant="light"
        className="m-4 text-xl"
        onClick={() => {
          router.back()
        }}
      >
        <FaLongArrowAltLeft />
        Volver
      </Button>
      <section className="grid grid-cols-3 justify-between gap-6">
        {loadingData
          ? (
          <div className="col-span-2 w-full flex justify-center items-center">
            <Spinner
              label="Cargando información de torneo..."
              color="primary"
              labelColor="primary"
              size="lg"
            />
          </div>
            )
          : (
          <article className="col-span-2 w-full">
            <form
              onSubmit={(e) => {
                handleSubmitTournament(e)
              }}
            >
              <h2 className="text-xl font-semibold m-4">Editar Torneo</h2>
              <div className="gridFormat border-1 border-black dark:border-white p-2">
                <div className="flex flex-col gap-2">
                  <Input
                    isRequired
                    type="text"
                    variant="bordered"
                    label="Nombre de torneo"
                    value={formData.nameTournament}
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
                    value={String(formData.valueTournament)}
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
                    value={formData.description}
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
                    defaultSelectedKeys={formData.category === '' ? ['Infantil'] : [`${formData.category}`]}
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
                          category.map(({ name }) => (
                        <SelectItem key={name} value={name}>
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
                  <Button
                    color="primary"
                    variant="ghost"
                    className="buttonPrimary w-32"
                    type="submit"
                  >
                    Modificar torneo
                  </Button>
                </div>
                <div className="flex flex-col gap-2">
                  <Input
                    isRequired
                    type="text"
                    variant="bordered"
                    value={formData.contactName}
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
                    value={formData.contactNumber}
                    label="Numero de teléfono de contacto"
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        contactNumber: event.target.value
                      })
                    }}
                  />
                  <Select
                    label="Seleccione el genero"
                    className="max-w-full"
                    isRequired
                    defaultSelectedKeys={formData.gender === '' ? ['Masculino'] : [`${formData.gender}`]}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        gender: event.target.value
                      })
                    }}
                  >
                    {gender !== null
                      ? (
                          gender.map(({ name }) => (
                        <SelectItem key={name} value={name}>
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
                    defaultSelectedKeys={formData.variant === '' ? ['Futbol 5'] : [`${formData.variant}`]}
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
                          subCategory.map(({ name }) => (
                        <SelectItem key={name} value={name}>
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
              </div>
            </form>
          </article>
            )}
        <article className="w-full">
          <h2 className="text-xl font-semibold m-4">Editar Premiación</h2>
          <div className="overflow-auto">
            <AwardTournamentEdit idTournament={id} />
          </div>
        </article>
      </section>
      <Toaster richColors />
    </div>
  )
}

export default PageTournamentEdit
