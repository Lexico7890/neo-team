'use client'

import Image from 'next/image'
import React, { useState } from 'react'

import { useSupabaseStore } from '@/app/zustand/store'
import DatePicker from '@/app/components/client/date-picker'
import InputCustomize from '@/app/components/client/input-customize'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { type Rol } from '@/app/types/rol'
import { type Position } from '@/app/types/position'

const UserInformation = ({ items, position }: { items: Rol[] | null, position: Position[] | null }) => {
  console.log(position)
  const [date, setDate] = useState<Date>()
  const [user] = useSupabaseStore((state) => [state.user])
  const [rolSelected, setRolSelected] = useState<string>('')
  console.log(rolSelected)
  return (
    <div className="w-full max-w-[1300px] ">
      <h1 className="text-center text-4xl font-bold m-10">Datos personales</h1>
      <div className="md:grid flex flex-col grid-cols-4 md:gap-8 gap-2 w-full">
        <div className="flex flex-col items-center">
          <Image
            src={
              user.avatar_url ??
              'https://i.pravatar.cc/150?u=a042581f4e29026704d'
            }
            width={120}
            height={120}
            alt="image of avatar"
            quality={75}
            className="rounded-full"
          />
        </div>
        <div className="col-span-3 block lg:flex">
          <div className="w-full flex flex-col gap-4 items-center p-2">
            <InputCustomize
              name="Nombre"
              placeholder="Nombre de usuario"
              type="text"
            />
            <DatePicker date={date} setDate={setDate} />
            <InputCustomize
              name="Numero de teléfono"
              placeholder="Numero de teléfono"
              type="number"
            />
          </div>
          <div className="w-full flex flex-col gap-4 items-center p-2">
            <InputCustomize name="Email" placeholder="Email" type="email" />
            <Select onValueChange={(value: any) => { setRolSelected(value) }}>
              <SelectTrigger className="w-full max-w-sm">
                <SelectValue placeholder="Seleccione un rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  {items?.map(({ name, id }) => (
                    <SelectItem value={name} key={id}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {
              rolSelected === 'Jugador' &&
                (
                  <>
                    <InputCustomize name="Numero de jugador" placeholder="Numero de jugador" type="number" />
                    <Select onValueChange={(value: any) => { setRolSelected(value) }}>
              <SelectTrigger className="w-full max-w-sm">
                <SelectValue placeholder="Seleccione una posición" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Posiciones</SelectLabel>
                  {position?.map(({ name, id }) => (
                    <SelectItem value={name} key={id}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
                  </>
                )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInformation
