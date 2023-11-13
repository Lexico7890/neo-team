'use client'

import { useEffect, useState } from 'react'
import { type Award } from '@/app/types/award'
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import AwardTournament from '../../components/award-tournament'
import { INIT_FORM_DATA } from '@/app/data/constant'
import { type TournamentData } from '@/app/types/schema/tournament-schema'
import useGetSupabase from '@/app/hooks/useGetSupabase'
import { type Tournament } from '@/app/types/tournament'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useSupabaseStore } from '@/app/zustand/store'

const PageTournamentEdit = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const router = useRouter()
  const { handleTournamentId } = useGetSupabase()
  const [formData, setFormData] = useState<TournamentData>(INIT_FORM_DATA)
  const [award, setAward] = useState<Award[]>([])
  const [category, gender, subCategory] = useSupabaseStore(state => [
    state.category,
    state.gender,
    state.subCategory
  ])

  useEffect(() => {
    const getTournament = async () => {
      const data: Tournament[] = await handleTournamentId(id)
      setFormData({
        nameTournament: data[0].name,
        valueTournament: data[0].value,
        description: data[0].description,
        category: data[0].nombre_categoria,
        gender: data[0].nombre_genero,
        variant: data[0].sub_categoria,
        contactName: data[0].contact_name,
        contactNumber: data[0].contact_number
      })
    }
    getTournament()
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
        <article className="col-span-2 w-full">
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
                defaultSelectedKeys={
                  formData.category === ''
                    ? ['Infantil']
                    : [`${formData.category}`]
                }
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
                onClick={() => {}}
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
                defaultSelectedKeys={
                  formData.gender === ''
                    ? ['Masculino']
                    : [`${formData.gender}`]
                }
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
                defaultSelectedKeys={
                  formData.variant === ''
                    ? ['Futbol 5']
                    : [`${formData.variant}`]
                }
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
        </article>
        <article className="w-full">
          <h2 className="text-xl font-semibold m-4">Editar Premiación</h2>
          <div>
            <AwardTournament
              award={award}
              setAward={setAward}
              idTournament={id}
            />
          </div>
        </article>
      </section>
    </div>
  )
}

export default PageTournamentEdit
