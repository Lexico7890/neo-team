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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import HoverCardColors from './hover-card'
import ChargerImageComponent from '@/app/components/client/charger-image-component'
import { TeamSchema, type TeamData } from '@/app/types/schema/team-schema'
import { INIT_TEAM_DATA } from '@/app/data/constant'
import { parse } from 'valibot'
import { Toaster, toast } from 'sonner'
import useChargeImageSupabase from '@/app/hooks/useChargeImageSupabase'

interface Props {
  name: string
}

async function Fetch (teamData: any) {
  const result = await fetch('/api/team', {
    method: 'POST',
    body: JSON.stringify({ teamData })
  })
  if (!result.ok) {
    throw new Error(result.statusText)
  }
}

const BottomCreateTeam = ({ name }: Props) => {
  const [isBlock, setIsBlock] = useState<boolean>(false)
  const [image, setImage] = useState<File | undefined>()
  const [extensionImage, setExtensionImage] = useState<string | undefined>('')
  const [formData, setFormData] = useState<TeamData>(INIT_TEAM_DATA)

  const { chargeImageSupabase } = useChargeImageSupabase()

  const handleChargeImage = (image?: File, extension?: string) => {
    setImage(image)
    setExtensionImage(extension)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setIsBlock(true)
      parse(TeamSchema, formData)
      formData.imageTeam = await chargeImageSupabase(image, extensionImage, 'imageTeam')
      toast.promise(Fetch(formData), {
        loading: 'Creando el equipo, un momento por favor...',
        success: () => {
          return 'Equipo creado con éxito'
        },
        error: 'No se pudo crear el equipo, comuníquese con el administrador'
      })
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsBlock(false)
    }
  }

  const handleChangeColor = (color: string, isFirst: boolean) => {
    if (isFirst) {
      setFormData({
        ...formData,
        firstColor: color
      })
    } else {
      setFormData({
        ...formData,
        secondColor: color
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={'outline'}
          className="dark:bg-black bg-white font-semibold text-lg"
        >
          {name}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crea un equipo</DialogTitle>
          <DialogDescription>
            Recuerda que estos datos no podrán ser modificados mientras el
            equipo se encuentre en un torneo en curso
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={(event) => { handleSubmit(event) }}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-center">
              Nombre
            </Label>
            <Input
              id="name"
              placeholder="Nombre del equipo"
              className="col-span-3"
              onChange={(event) => {
                setFormData({
                  ...formData,
                  name: event.target.value
                })
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <HoverCardColors handleChangeColor={handleChangeColor} name="Color primario" isFirst />
              {formData.firstColor === ''
                ? (
                <p>Sin color seleccionado</p>
                  )
                : (
                <div
                  style={{
                    height: '50px',
                    width: '50px',
                    backgroundColor: formData.firstColor
                  }}
                ></div>
                  )}
            </div>
            <div className="flex flex-col justify-center items-center">
              <HoverCardColors
                handleChangeColor={handleChangeColor}
                name="Color secundario"
                isFirst={false}
              />
              {formData.secondColor === ''
                ? (
                <p>Sin color seleccionado</p>
                  )
                : (
                <div
                  style={{
                    height: '50px',
                    width: '50px',
                    backgroundColor: formData.secondColor
                  }}
                ></div>
                  )}
            </div>
          </div>
          <div>
            <ChargerImageComponent
              handleChargeImage={handleChargeImage}
              imageProp={formData.imageTeam}
            />
          </div>
          <div className='flex justify-end'>
            <Button type='submit' disabled={isBlock}>Crear</Button>
          </div>
        </form>
      </DialogContent>
      <Toaster richColors position="bottom-right"/>
    </Dialog>
  )
}

export default BottomCreateTeam
