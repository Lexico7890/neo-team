'use client'

import { type Tournament } from '@/app/types/tournament'
import { type TournamentState } from '@/app/types/tournament-state'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'

interface Props {
  dataState: TournamentState[]
  dataTournament: Tournament
}

async function Fetch (tournamentId: string, newState: string | undefined, field: string) {
  const result = await fetch('/api/tournament', {
    method: 'PUT',
    body: JSON.stringify({ tournamentId, newState, field })
  })
  if (!result.ok) {
    throw new Error(result.statusText)
  }
  return await result.json()
}

const InitTournament = ({ dataState, dataTournament }: Props) => {
  const [start, setStart] = useState<boolean>(false)
  const [nameState, setNameState] = useState<string>('')
  const [disabledBottom, setDisabledBottom] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let state: TournamentState | undefined
    if (nameState === 'creado') {
      state = dataState.find(item => item.name === 'iniciado')
    } else if (nameState === 'iniciado') {
      state = dataState.find(item => item.name === 'terminado')
    }
    try {
      setDisabledBottom(true)
      toast.promise(Fetch(dataTournament.id, state?.id, 'state_id'), {
        loading: 'Actualizando el estado del torneo...',
        success: (data) => {
          const result: Tournament = data.result[0]
          const value: TournamentState | undefined = dataState.find(item => item.id === result.state_id)
          if (value !== undefined) {
            setNameState(value.name)
          }
          setStart(false)
          setDisabledBottom(false)
          return 'Estado actualizado con éxito'
        },
        error: 'No se pudo actualizar el estado del torneo, comuníquese con el administrador'
      })
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setDisabledBottom(false)
      }, 5000)
    }
  }
  useEffect(() => {
    const value: TournamentState | undefined = dataState.find(item => item.id === dataTournament.state_id)
    if (value !== undefined) {
      setNameState(value.name)
    }
  }, [])

  return (
    <Popover>
      <PopoverTrigger className="flex items-center justify-center gap-2">
        <span>Estado</span>{' '}
        <div
          className="h-3 w-3 rounded-full"
          style={{ background: nameState === 'iniciado' ? 'green' : 'grey' }}
        ></div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center space-x-2 justify-center">
          <Switch
            id="airplane-mode"
            onCheckedChange={() => {
              setStart(!start)
            }}
            disabled={nameState === 'terminado'}
            checked={nameState === 'iniciado'}
          />
          <Label htmlFor="airplane-mode">
            Torneo {nameState}
          </Label>
        </div>
      </PopoverContent>
      <Dialog open={start} onOpenChange={setStart}>
        <DialogContent>
        <form onSubmit={(e) => { handleSubmit(e) }} className='flex flex-col gap-4'>
          <DialogHeader>
            <span>TORNEO {nameState.toUpperCase()}</span>
          </DialogHeader>
          <div className='text-lg'>
            {nameState === 'creado' && <span>¿Estas seguro que deseas INICIAR el torneo? </span>}
            {nameState === 'iniciado' && <span>¿Estas seguro que deseas FINALIZAR el torneo?</span>}
            {nameState === 'terminado' && <span>¿Estas seguro que deseas iniciar el torneo?</span>}
          </div>
          <DialogDescription>
            {
              nameState !== 'terminado' && <span>estos cambios no se podrán deshacer</span>
            }
          </DialogDescription>
          <DialogFooter>
            <Button type='submit' disabled={disabledBottom}>Seguro</Button>
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster richColors/>
    </Popover>
  )
}

export default InitTournament
