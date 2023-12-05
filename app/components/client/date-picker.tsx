'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { es } from 'date-fns/locale'

interface Props {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

const DatePicker = ({ date, setDate }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'max-w-sm justify-start text-left font-normal w-full',
            date === undefined && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date !== undefined ? format(date, 'd MMMM yyyy', { locale: es }) : <span>Fecha de nacimiento</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(event) => {
            setDate(event)
          }}
          initialFocus
          locale={es}
          captionLayout='dropdown'
          fromYear={1965}
          toYear={new Date().getFullYear()}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
