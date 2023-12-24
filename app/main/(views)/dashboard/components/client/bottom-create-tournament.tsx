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
import { GoPlusCircle } from 'react-icons/go'

interface Props {
  leagueId: string
}

const BottomCreateTournament = ({ leagueId }: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='w-full flex gap-2 justify-start'><GoPlusCircle /><span>Nuevo torneo</span></Button>
      </DialogTrigger>
      <DialogContent className="sm:h-3/4 sm:w-3/4 max-w-none h-full overflow-auto">
        <DialogHeader>
          <DialogTitle>Crear nuevo torneo</DialogTitle>
          <DialogDescription>
            Ingresa la información necesaria para iniciar un nuevo torneo
          </DialogDescription>
        </DialogHeader>
        <FormCreateTournament leagueId={leagueId} setOpen={setOpen}/>
      </DialogContent>
    </Dialog>
  )
}

export default BottomCreateTournament
