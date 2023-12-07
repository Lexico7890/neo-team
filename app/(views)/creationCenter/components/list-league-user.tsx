'use client'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandInput, CommandList } from '@/components/ui/command'
import { Dialog } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useState } from 'react'

const ListLeagueUser = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [showNewTeamDialog, setShowNewTeamDialog] = useState<boolean>(false)
  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
        <Button
            variant="outline"
            role="combobox"
            aria-label="Select a team"
            className='w-[200px] justify-between'
          >
            selleccionar
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
            <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Dialog>
  )
}

export default ListLeagueUser
