'use client'

import { useState, memo, useEffect } from 'react'
import CardCreation from '../components/card-creation'
import { Button, Divider } from '@nextui-org/react'
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
import TournamentContainer from './components/client/tournament-container'
import ListTournament from './components/server/list-tournament'
import ModalCreateLeague from './components/server/modal-create-league'

const TournamentSchema = object({
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

type TournamentData = Output<typeof TournamentSchema>

async function Fetch (formData: any, award: any, idUser: string | undefined) {
  const result = await fetch('/api/league', {
    method: 'POST',
    body: JSON.stringify({ formData, award, idUser })
  })
  if (!result.ok) {
    throw new Error(result.statusText)
  }
  return await result.json()
}

const PageCreateLeague = () => {
  const [formData, setFormData] = useState<TournamentData>({
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
  const [isBlock, setBlock] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [showModalLeague, setShowModal] = useState<boolean>(false)

  const { category, gender, session, subCategory, tournament, league } = useGetSupabase()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (award.length < 1) {
        throw new Error(
          'Se debe agregar por lo menos un item en la premiación'
        )
      }
      parse(TournamentSchema, formData)
      setBlock(true)
      const id = session?.user.id
      toast.promise(Fetch(formData, award, id), {
        loading: 'Creando la liga, un momento por favor...',
        success: 'Liga creada con éxito',
        error: 'No se pudo crear la liga, comuníquese con el administrador'
      })
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setBlock(false)
    }
  }

  useEffect(() => {
    league.length === 0 ? setShowModal(true) : setShowModal(false)
  }, [league])

  return (
    <div className="flex gap-10 h-auto">
      <ModalCreateLeague isOpen={showModalLeague} />
      <div className="hidden md:block">
        <CardCreation
          title="Crear Liga"
          urlImage="/image/imageLeague.jpg"
          height={300}
          width={300}
          isThereButton={false}
          path=''
        />
      ModalCreateLeague</div>
      <div className="w-full flex flex-col gap-4">
        <div className='flex justify-between items-center'>
          <h1 className="text-2xl">Administrador de ligas</h1>
          <Button
            color="primary"
            variant="ghost"
            className="hover:text-white my-4"
            onClick={() => { setShowForm(true) }}
          >
            Crear liga
          </Button>
        </div>
        <div>
          <ListTournament tournament={tournament}/>
        </div>
        {showForm && (
          <div className="border-1 border-black w-full p-2 sm:p-10">
            <h3 className="text-lg my-4">Información de liga</h3>
            <form
              onSubmit={(event) => {
                handleSubmit(event)
              }}
            >
              <Divider className="my-4" />
              <h3 className="text-lg my-4">Crear Torneo</h3>
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
                disabled={isBlock}
              >
                Enviar
              </Button>
            </form>
            <Toaster richColors />
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(PageCreateLeague)
