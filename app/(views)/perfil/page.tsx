'use client'

import { useSupabaseStore } from '@/app/zustand/store'
import { Input, Select, SelectItem } from '@nextui-org/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

const PerfilPage = () => {
  const [user] = useSupabaseStore((state) => [state.user])
  const [date, setDate] = useState<Date>()
  console.log(user)
  return (
    <div className="w-full">
      <h1 className="text-center text-4xl font-bold m-10">Datos personales</h1>
      <div className="md:grid flex flex-col grid-cols-3 md:gap-8 gap-2 w-full">
        <div className="flex justify-center">
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
        <div className="col-span-2 gridFormat">
          <div>
            <Input
              isRequired
              type="text"
              variant="bordered"
              label="Nombre de usuario"
            />
            <Select label="Seleccione un rol" className="max-w-full mt-2">
              <SelectItem key="option one">item one</SelectItem>
            </Select>
            <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            date === undefined && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date !== undefined ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
          </div>
          <div>
            <Input isRequired type="email" variant="bordered" label="Email" />
            <Input
              isRequired
              type="number"
              variant="bordered"
              label="Numero de teléfono"
              className="mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerfilPage
