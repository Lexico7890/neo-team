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

const BottomCreateTournament = () => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="absolute bottom-4 right-4 z-50">Nuevo torneo</Button>
      </DialogTrigger>
      <DialogContent className="h-3/4 w-3/4 max-w-none">
        <DialogHeader>
          <DialogTitle>Crear nuevo torneo</DialogTitle>
          <DialogDescription>
            Ingresa la información necesaria para iniciar un nuevo torneo
          </DialogDescription>
        </DialogHeader>
        <FormCreateTournament />
      </DialogContent>
    </Dialog>
  )
}

export default BottomCreateTournament
