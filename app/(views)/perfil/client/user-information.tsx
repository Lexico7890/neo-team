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
import { type Gender } from '@/app/types/gender'
import { type UserData } from '@/app/types/schema/user-schema'
import { INIT_USER_DATA } from '@/app/data/constant'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const UserInformation = ({
  items,
  position,
  gender
}: {
  items: Rol[] | null
  position: Position[] | null
  gender: Gender[] | null
}) => {
  const [date, setDate] = useState<Date>()
  const [user] = useSupabaseStore((state) => [state.user])
  const [rolSelected, setRolSelected] = useState<string>('')
  const [userData, setUserData] = useState<UserData>(INIT_USER_DATA)
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
          <div className="w-full flex flex-col gap-8 items-center p-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="text">Nombre</Label>
              <Input
                type="text"
                id="nameUser"
                placeholder="Nombre de usuario"
                value={user.name}
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    nameUser: event.target.value
                  })
                }}
              />
            </div>
            <DatePicker date={date} setDate={setDate} />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="number">Numero de teléfono</Label>
              <Input
                type="number"
                id="phoneNumber"
                placeholder="Numero de teléfono"
                value={user.phone_number as string}
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    phoneNumber: event.target.value
                  })
                }}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="number">Numero de identificación</Label>
              <Input
                type="number"
                id="numberIdentity"
                placeholder="Numero de identificación"
                value={user.number as string}
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    numberIdentity: Number(event.target.value)
                  })
                }}
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-8 items-center p-2">
            <InputCustomize name="Email" placeholder="Email" type="email" />
            <Select
              onValueChange={(value: any) => {
                setRolSelected(value)
              }}
            >
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
            <Select
              onValueChange={(value: any) => {
                setRolSelected(value)
              }}
            >
              <SelectTrigger className="w-full max-w-sm">
                <SelectValue placeholder="Seleccione su genero" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Géneros</SelectLabel>
                  {gender?.map(({ name, id }) => (
                    <SelectItem value={name} key={id}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {rolSelected === 'Jugador' && (
              <>
                <Select
                  onValueChange={(value: any) => {
                    setRolSelected(value)
                  }}
                >
                  <SelectTrigger className="w-full max-w-sm">
                    <SelectValue placeholder="Seleccione una posición" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Posiciones</SelectLabel>
                      {position?.map(({ name, id }) => (
                        <SelectItem value={name as string} key={id}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInformation
