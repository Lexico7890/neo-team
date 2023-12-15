'use client'

import Image from 'next/image'
import React, { memo, useEffect, useState } from 'react'

import { useSupabaseStore } from '@/app/zustand/store'
import DatePicker from '@/app/components/client/date-picker'
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
import {
  UserSchemaPlayer,
  UserSchemaReferee,
  type UserDataPlayer,
  type UserDataReferee
} from '@/app/types/schema/user-schema'
import { INIT_USER_DATA } from '@/app/data/constant'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { parse } from 'valibot'
import userDefaultImage from '../../../../../public/image/userDefaultImage.jpg'
import { Toaster, toast } from 'sonner'

async function Fetch (userData: any, userId: string) {
  const result = await fetch(`/api/user/${userId}`, {
    method: 'POST',
    body: JSON.stringify({ userData })
  })
  if (!result.ok) {
    throw new Error(result.statusText)
  }
  return await result.json()
}

function getDateFromUser () {
  const objectDate = new Date()

  return {
    day: objectDate.getDate(),
    month: objectDate.getMonth(),
    year: objectDate.getFullYear()
  }
}

const UserInformation = ({
  items,
  position,
  gender
}: {
  items: Rol[] | null
  position: Position[] | null
  gender: Gender[] | null
}) => {
  const [user] = useSupabaseStore((state) => [state.user])
  const [rolSelected, setRolSelected] = useState<string>('')
  const [userData, setUserData] = useState<UserDataPlayer | UserDataReferee>(
    INIT_USER_DATA
  )
  const [loading, setLoading] = useState<boolean>(true)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (rolSelected === 'Jugador') {
        parse(UserSchemaPlayer, userData)
      } else {
        userData.position = null
        parse(UserSchemaReferee, userData)
      }
      toast.promise(Fetch(userData, user.id), {
        loading: 'Guardando los datos, por favor espere...',
        success: () => {
          return 'Datos guardados con éxito'
        },
        error: 'No se pudo guardar los datos, comuníquese con el administrador'
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const updateUserData = () => {
    const { day, month, year } = getDateFromUser()
    userData.avatar_url = user.avatar_url
    userData.nameUser = user.name
    userData.emailUser = user.email ?? ''
    if (user.bird_date !== '') {
      user.bird_date !== null && new Date(user.bird_date)
    } else userData.dateBirth = new Date(`${month + 1}/${day}/${year}`)
    userData.phoneNumber = user.phone_number ?? ''
    userData.gender = user.gender ?? ''
    userData.rol = user.rol_id ?? ''
    userData.numberIdentity = user.number_identity ?? ''
    userData.position = user.position_id?.toString() ?? ''
  }

  const handleDateBirth = (date: Date | undefined) => {
    let day: number = 0
    let month: number = 0
    let year: number = 0
    if (date !== undefined) {
      day = date.getDate()
      month = date.getMonth()
      year = date.getFullYear()
    }
    setUserData({
      ...userData,
      dateBirth: new Date(`${month + 1}/${day}/${year}`) ?? new Date()
    })
  }

  useEffect(() => {
    updateUserData()
    setLoading(false)
  }, [user])

  console.log('entro')

  return (
    <div className="w-full max-w-[1300px] ">
      {loading
        ? (
        <p>Cargando...</p>
          )
        : (
        <form
          onSubmit={(event) => {
            handleSubmit(event)
          }}
          className="flex flex-col gap-10"
        >
          <h1 className="text-center text-4xl font-bold m-4 sm:m-10">
            Datos personales
          </h1>
          <div className="md:grid flex flex-col grid-cols-4 md:gap-8 gap-2 w-full">
            <div className="flex flex-col items-center gap-10">
              {user.avatar_url === ''
                ? (
                <p>Cargando...</p>
                  )
                : (
                <Image
                  src={`${user.avatar_url}` ?? userDefaultImage}
                  width={120}
                  height={120}
                  alt="image of avatar"
                  quality={75}
                  className="rounded-full"
                />
                  )}
              <div className="flex flex-col items-center gap-4">
                <h1 className="font-bold text-2xl">Tu equipo</h1>
                <span className="text-center">
                  Aun no perteneces a ningún equipo
                </span>
                <Button>Buscar equipo</Button>
              </div>
            </div>
            <div className="col-span-3 block lg:flex">
              <div className="w-full flex flex-col gap-8 items-center p-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="text">Nombre</Label>
                  <Input
                    type="text"
                    id="nameUser"
                    placeholder="Nombre de usuario"
                    value={userData.nameUser}
                    onChange={(event) => {
                      setUserData({
                        ...userData,
                        nameUser: event.target.value
                      })
                    }}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="birthDate">Fecha de nacimiento</Label>
                  <DatePicker
                    date={userData.dateBirth}
                    setDate={handleDateBirth}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="number">Numero de teléfono</Label>
                  <Input
                    type="number"
                    id="phoneNumber"
                    placeholder="Numero de teléfono"
                    value={userData.phoneNumber}
                    onChange={(event) => {
                      setUserData({
                        ...userData,
                        phoneNumber: event.target.value
                      })
                    }}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="identityNumber">
                    Numero de identificación
                  </Label>
                  <Input
                    type="number"
                    id="numberIdentity"
                    placeholder="Numero de identificación"
                    value={userData.numberIdentity}
                    onChange={(event) => {
                      setUserData({
                        ...userData,
                        numberIdentity: event.target.value
                      })
                    }}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-8 items-center p-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Email usuario</Label>
                  <Input
                    type="email"
                    id="emailUser"
                    placeholder="Email usuario"
                    value={userData.emailUser}
                    onChange={(event) => {
                      setUserData({
                        ...userData,
                        emailUser: event.target.value
                      })
                    }}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="rol">Roles</Label>
                  <Select
                    onValueChange={(value: any) => {
                      setUserData({
                        ...userData,
                        rol: value
                      })
                      const selectRol = items?.find(
                        (item) => item.id === value
                      )
                      if (selectRol !== undefined) {
                        setRolSelected(selectRol?.name)
                      }
                    }}
                    value={userData.rol}
                  >
                    <SelectTrigger className="w-full max-w-sm">
                      <SelectValue placeholder="Seleccione un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        {items?.map(({ name, id }) => (
                          <SelectItem value={id} key={id}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="gender">Géneros</Label>
                  <Select
                    onValueChange={(value: any) => {
                      setUserData({
                        ...userData,
                        gender: value
                      })
                    }}
                    value={userData.gender}
                  >
                    <SelectTrigger className="w-full max-w-sm">
                      <SelectValue placeholder="Seleccione su genero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Géneros</SelectLabel>
                        {gender?.map(({ name, id }) => (
                          <SelectItem value={id} key={id}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {rolSelected === 'Jugador' && (
                  <>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="position">Posiciones</Label>
                      <Select
                        onValueChange={(value: any) => {
                          setUserData({
                            ...userData,
                            position: value
                          })
                        }}
                        value={userData.position ?? ''}
                      >
                        <SelectTrigger className="w-full max-w-sm">
                          <SelectValue placeholder="Seleccione una posición" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Posiciones</SelectLabel>
                            {position?.map(({ name, id }) => (
                              <SelectItem value={id.toString()} key={id}>
                                {name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              className="hover:bg-slate-200 hover:text-black"
              type="submit"
            >
              Guardar información
            </Button>
          </div>
        </form>
          )}
      <Toaster richColors />
    </div>
  )
}

export default memo(UserInformation)
