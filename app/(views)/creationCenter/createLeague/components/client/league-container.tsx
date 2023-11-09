'use client'

import ChargerImageComponent from '@/app/components/client/charger-image-component'
import { Input } from '@nextui-org/react'
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
    <div className="gridFormat">
      <Input
        isRequired
        type="text"
        variant="bordered"
        label="Nombre de la liga"
        onChange={(event) => {
          setFormData({
            ...formData,
            nameLeague: event.target.value
          })
        }}
      />
      <ChargerImageComponent handleChargeImage={handleChargeImage} />
    </div>
  )
}

export default LeagueContainer
