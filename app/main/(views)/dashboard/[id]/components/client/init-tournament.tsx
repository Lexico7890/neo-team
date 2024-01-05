'use client'

import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'

const InitTournament = () => {
  const [start, setStart] = useState<boolean>(false)
  return (
    <Popover>
      <PopoverTrigger className="flex items-center justify-center gap-2">
        <span>Estado</span>{' '}
        <div
          className="h-3 w-3 rounded-full"
          style={{ background: start ? 'green' : 'grey' }}
        ></div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center space-x-2 justify-center">
          <Switch
            id="airplane-mode"
            onCheckedChange={() => {
              setStart(!start)
            }}
            checked={start}
          />
          <Label htmlFor="airplane-mode">
            {start ? 'Iniciado' : 'No iniciado'}
          </Label>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default InitTournament
