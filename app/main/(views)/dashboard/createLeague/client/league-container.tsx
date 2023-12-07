'use client'

import ChargerImageComponent from '@/app/components/client/charger-image-component'
import { Input } from '@/components/ui/input'
import React from 'react'

interface Props {
  formData: any
  setFormData: any
  handleChargeImage: any
}

const LeagueContainer = ({
  formData,
  setFormData,
  handleChargeImage
}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Nombre de la liga"
        value={formData.nameLeague}
        onChange={(event) => {
          setFormData({
            ...formData,
            nameLeague: event.target.value
          })
        }}
      />
      <ChargerImageComponent handleChargeImage={handleChargeImage} imageProp={formData.imageLeague} />
    </div>
  )
}

export default LeagueContainer
