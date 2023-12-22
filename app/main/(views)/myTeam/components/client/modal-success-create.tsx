'use client'

import { type Team } from '@/app/types/team'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Image from 'next/image'

interface Props {
  isOpen: boolean
  teamData: Team
}

const ModalSuccessCreate = ({ isOpen, teamData }: Props) => {
  console.log(teamData)
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <h1 className="text-3xl font-bold">Felicitaciones</h1>
        <div className="grid grid-cols-2">
          <div className="flex flex-col justify-center items-center gap-2">
            <span>{teamData.name}</span>
            <Image
              src={teamData.image ?? ''}
              height={150}
              width={150}
              alt="imagen del nuevo equipo"
            />
          </div>
          <div>
            <p className="text-justify">
              Tu equipo ha sido creado con éxito y eres el primer jugador por lo
              tanto el administrador del mismo, ahora puedes administrarlo,
              agregar jugadores y demás acciones que te permite la plataforma.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Button className="bg-yellow-400 hover:bg-yellow-300">
            Ver equipo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalSuccessCreate
