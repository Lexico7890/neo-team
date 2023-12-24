'use client'

import { type Tournament } from '@/app/types/tournament'
import { useSupabaseStore } from '@/app/zustand/store'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useState } from 'react'
import { CgArrowsExchangeAltV } from 'react-icons/cg'
import BottomCreateTournament from './client/bottom-create-tournament'

interface Props {
  tournaments: Tournament[]
  leagueId: string
}

const ListLeagueUser = ({ tournaments, leagueId }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [showNewTeamDialog, setShowNewTeamDialog] = useState<boolean>(false)
  const [setTournamentId, tournament] = useSupabaseStore((state) => [
    state.setTournamentId,
    state.tournament
  ])
  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-label="Select a team"
            className="w-[200px] justify-between"
          >
            {tournament.name}
            <CgArrowsExchangeAltV />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No hay torneos</CommandEmpty>
              {tournaments.map((tournament) => (
                <CommandItem
                  key={tournament.id}
                  onSelect={() => {
                    setTournamentId(tournament)
                  }}
                >
                  {tournament.name}
                </CommandItem>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {}}
                    className="flex justify-around p-0"
                  >
                    <BottomCreateTournament leagueId={leagueId}/>
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Dialog>
  )
}

export default ListLeagueUser
