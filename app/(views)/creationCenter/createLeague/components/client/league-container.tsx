'use client'

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
      <div>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Cargar imagen de liga
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          onChange={(e) => {
            handleChargeImage(e)
          }}
        />
      </div>
    </div>
  )
}

export default LeagueContainer
