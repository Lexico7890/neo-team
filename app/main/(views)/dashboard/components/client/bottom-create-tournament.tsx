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
import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useSupabaseStore } from '@/app/zustand/store'

const BottomCreateTournament = () => {
  const [open, setOpen] = useState(false)
  const [disabledBottom, setDisabledBottom] = useState<boolean>(true)
  const [league] = useSupabaseStore((state) => [state.league])

  useEffect(() => {
    if (league.id !== '') {
      setDisabledBottom(false)
    }
  }, [league])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={disabledBottom}>
        <Button variant='outline' size='lg'><FaPlus /></Button>
      </DialogTrigger>
      <DialogContent className="sm:h-3/4 sm:w-3/4 max-w-none h-full overflow-auto">
        <DialogHeader>
          <DialogTitle>Crear nuevo torneo</DialogTitle>
          <DialogDescription>
            Ingresa la información necesaria para iniciar un nuevo torneo
          </DialogDescription>
        </DialogHeader>
        <FormCreateTournament leagueId={league.id} setOpen={setOpen} isEdit={false}/>
      </DialogContent>
    </Dialog>
  )
}

export default BottomCreateTournament
