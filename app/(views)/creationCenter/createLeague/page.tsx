'use client'

import { useEffect, useState } from 'react'
import CardCreation from '../components/card-creation'
import { Button, useDisclosure } from '@nextui-org/react'
import ListTournament from './components/server/list-tournament'
import ModalCreateLeague from './components/server/modal-create-league'
import Image from 'next/image'
import { useSupabaseStore } from '@/app/zustand/store'
import ModalCreateTournament from './components/client/modal-create-tournament'

const PageCreateLeague = () => {
  const [
    category,
    gender,
    subCategory,
    getLeagueId,
    leagueId,
    tournament,
    getTournament,
    league
  ] = useSupabaseStore((state) => [
    state.category,
    state.gender,
    state.subCategory,
    state.getLeagueId,
    state.leagueId,
    state.tournament,
    state.getTournament,
    state.league
  ])
  const [showModalLeague, setShowModal] = useState<boolean>(true)
  const [isEdit, setEdit] = useState<boolean>(false)
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  const handleCreateLeague = () => {
    setEdit(false)
    setShowModal(false)
  }

  const handleEditTournament = (item: any) => {
    /* const selectItem: TournamentData = {
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
    setShowForm(true) */
  }

  useEffect(() => {
    getLeagueId()
    if (leagueId.id !== '') {
      setShowModal(false)
      getTournament(leagueId.id)
    }
  }, [leagueId, league])

  return (
    <div className="flex gap-10 h-auto">
      <ModalCreateTournament
        isOpen={isOpen}
        category={category}
        gender={gender}
        subCategory={subCategory}
        leagueId={leagueId.id}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
      <ModalCreateLeague
        isOpen={showModalLeague}
        setIsOpen={setShowModal}
        handleCreateLeague={handleCreateLeague}
        league={leagueId}
        isEdit={isEdit}
        setEdit={setEdit}
      />
      <div className="hidden md:block">
        {leagueId.id !== ''
          ? (
          <>
            <div className='min-h-[200px]'>
            <Image
              src={leagueId.url_image ?? ''}
              height={250}
              width={250}
              alt="image of league"
            />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-center">{leagueId.name}</span>
              <Button
                color="primary"
                variant="ghost"
                className="buttonPrimary"
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
            title={leagueId.id !== '' ? 'Crear Liga' : leagueId.name}
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
              onOpen()
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
      </div>
    </div>
  )
}

export default PageCreateLeague
