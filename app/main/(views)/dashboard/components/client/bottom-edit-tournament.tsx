'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import FormCreateTournament from './form-create-tournament'
import { useState } from 'react'
import { TbEditOff } from 'react-icons/tb'

interface Props {
  leagueId: string
  tournamentId: string
}

const BottomEditTournament = ({ leagueId, tournamentId }: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'><TbEditOff /></Button>
      </DialogTrigger>
      <DialogContent className="sm:h-3/4 sm:w-3/4 max-w-none h-full overflow-auto">
        <DialogHeader>
          <DialogTitle>Editar torneo</DialogTitle>
          <DialogDescription>
            Aquí podrás editar la información de tu torneo, recuerda que una ves iniciado este no podrá ser modificado
          </DialogDescription>
        </DialogHeader>
        <FormCreateTournament leagueId={leagueId} setOpen={setOpen} isEdit={true} tournamentId={tournamentId}/>
      </DialogContent>
    </Dialog>
  )
}

export default BottomEditTournament
