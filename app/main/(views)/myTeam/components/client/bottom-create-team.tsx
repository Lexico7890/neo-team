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

interface Props {
  name: string
}
const BottomCreateTeam = ({ name }: Props) => {
  const [first, setFirstColor] = useState<string>('')
  const [second, setSecondColor] = useState<string>('')
  const [isBlock, setIsBlock] = useState<boolean>(false)
  const [image, setImage] = useState<File | undefined>()
  const [extensionImage, setExtensionImage] = useState<string | undefined>('')
  const [formData, setFormData] = useState<TeamData>(INIT_TEAM_DATA)

  const handleChargeImage = (image?: File, extension?: string) => {
    setImage(image)
    setExtensionImage(extension)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      console.log('entro')
      setIsBlock(true)
      setFormData({ ...formData, firstColor: first, secondColor: second })
      parse(TeamSchema, formData)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsBlock(false)
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
              <HoverCardColors setColor={setFirstColor} name="Color primario" />
              {first === ''
                ? (
                <p>Sin color seleccionado</p>
                  )
                : (
                <div
                  style={{
                    height: '50px',
                    width: '50px',
                    backgroundColor: first
                  }}
                ></div>
                  )}
            </div>
            <div className="flex flex-col justify-center items-center">
              <HoverCardColors
                setColor={setSecondColor}
                name="Color secundario"
              />
              {second === ''
                ? (
                <p>Sin color seleccionado</p>
                  )
                : (
                <div
                  style={{
                    height: '50px',
                    width: '50px',
                    backgroundColor: second
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
