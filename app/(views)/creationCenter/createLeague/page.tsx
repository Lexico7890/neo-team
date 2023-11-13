'use client'

import { useEffect, useState } from 'react'
import CardCreation from '../components/card-creation'
import { Button } from '@nextui-org/react'
import { parse } from 'valibot'
import { toast, Toaster } from 'sonner'
import useGetSupabase from '@/app/hooks/useGetSupabase'
import TournamentContainer from './components/client/tournament-container'
import ListTournament from './components/server/list-tournament'
import ModalCreateLeague from './components/server/modal-create-league'
import Image from 'next/image'
import { FaRegWindowClose } from 'react-icons/fa'
import { type Tournament } from '@/app/types/tournament'
import { type Award } from '@/app/types/award'
import { type TournamentData, TournamentSchema } from '@/app/types/schema/tournament-schema'
import { INIT_FORM_DATA } from '@/app/data/constant'
import { useSupabaseStore } from '@/app/zustand/store'

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

const PageCreateLeague = () => {
  const {
    tournament,
    league,
    isLoading,
    handleTournament,
    handleLeague,
    session
  } = useGetSupabase()
  const [category, gender, subCategory] = useSupabaseStore(state => [
    state.category,
    state.gender,
    state.subCategory
  ])
  const [formData, setFormData] = useState<TournamentData>(INIT_FORM_DATA)
  const [award, setAward] = useState<Award[]>([])
  const [isBlock, setBlock] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [showModalLeague, setShowModal] = useState<boolean>(true)
  const [isEdit, setEdit] = useState<boolean>(false)

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
      toast.promise(Fetch(formData, award, league[0].id), {
        loading: 'Creando la liga, un momento por favor...',
        success: () => {
          handleTournament()
          setShowForm(false)
          return 'Liga creada con éxito'
        },
        error: 'No se pudo crear la liga, comuníquese con el administrador'
      })
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setBlock(false)
    }
  }

  const handleCreateLeague = () => {
    handleLeague(session?.user.id as string)
    setEdit(false)
    setShowModal(false)
  }

  const handleEditTournament = (item: Tournament) => {
    const selectItem: TournamentData = {
      nameTournament: item.name,
      valueTournament: item.value,
      description: item.description,
      category: item.nombre_categoria,
      gender: item.nombre_genero,
      variant: item.sub_categoria,
      contactName: item.contact_name,
      contactNumber: item.contact_number
    }
    setFormData(selectItem)
    setShowForm(true)
  }

  useEffect(() => {
    if (league.length > 0) {
      setShowModal(false)
    }
  }, [league])

  return (
    <div className="flex gap-10 h-auto">
      <ModalCreateLeague
        isOpen={!isLoading && showModalLeague}
        setIsOpen={setShowModal}
        handleCreateLeague={handleCreateLeague}
        league={league}
        isEdit={isEdit}
        setEdit={setEdit}
      />
      <div className="hidden md:block">
        {league.length > 0
          ? (
          <>
            <Image
              src={league[0].url_image ?? ''}
              height={250}
              width={250}
              alt="image of league"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold">{league[0].name}</span>
              <Button
                color="primary"
                variant="ghost"
                className="buttonPrimary w-28"
                onClick={() => {
                  setEdit(true)
                  setShowModal(true)
                }}
              >
                Editar liga
              </Button>
            </div>
          </>
            )
          : (
          <CardCreation
            title={league.length === 0 ? 'Crear Liga' : league[0].name}
            urlImage="/image/imageLeague.jpg"
            height={300}
            width={300}
            isThereButton={false}
            path=""
          />
            )}
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Administrador de ligas</h1>
          <Button
            color="primary"
            variant="ghost"
            className="buttonPrimary"
            onClick={() => {
              setFormData(INIT_FORM_DATA)
              setShowForm(true)
            }}
          >
            Crear Torneo
          </Button>
        </div>
        <div>
          <ListTournament
            tournament={tournament}
            showMore={handleEditTournament}
          />
        </div>
        {showForm && (
          <div className="border-1 border-black dark:border-white w-full p-2 sm:p-10 relative">
            <div
              className="absolute top-5 right-5 cursor-pointer"
              onClick={() => {
                setShowForm(false)
                setAward([] as any)
              }}
            >
              <FaRegWindowClose />
            </div>
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

export default PageCreateLeague
