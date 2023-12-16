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
import { type TeamData } from '@/app/types/schema/team-schema'
import { INIT_TEAM_DATA } from '@/app/data/constant'

interface Props {
  name: string
}
const BottomCreateTeam = ({ name }: Props) => {
  const [firstColor, setFirstColor] = useState<string>('')
  const [secondColor, setSecondColor] = useState<string>('')
  const [imageLeague, setImage] = useState<File | undefined>()
  const [extensionImage, setExtensionImage] = useState<string | undefined>('')
  const [formData, setFormData] = useState<TeamData>(INIT_TEAM_DATA)

  const handleChargeImage = (image?: File, extension?: string) => {
    setImage(image)
    setExtensionImage(extension)
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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-center">
              Nombre
            </Label>
            <Input
              id="name"
              placeholder="Nombre del equipo"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <HoverCardColors setColor={setFirstColor} name="Color primario" />
              {firstColor === ''
                ? (
                <p>Sin color seleccionado</p>
                  )
                : (
                <div
                  style={{
                    height: '50px',
                    width: '50px',
                    backgroundColor: firstColor
                  }}
                ></div>
                  )}
            </div>
            <div className="flex flex-col justify-center items-center">
              <HoverCardColors
                setColor={setSecondColor}
                name="Color secundario"
              />
              {secondColor === ''
                ? (
                <p>Sin color seleccionado</p>
                  )
                : (
                <div
                  style={{
                    height: '50px',
                    width: '50px',
                    backgroundColor: secondColor
                  }}
                ></div>
                  )}
            </div>
          </div>
          <div>
            <ChargerImageComponent handleChargeImage={handleChargeImage} imageProp={formData.imageTeam}/>
          </div>
          <div></div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BottomCreateTeam
