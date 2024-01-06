import { Menubar, MenubarMenu } from '@/components/ui/menubar'
import SheetAward from './sheet-award'
import SheetSanction from './sheet-sanction'
import InitTournament from './init-tournament'
import useDashboardServerSupabase from '@/app/hooks/useDashboardServerSupabase'
import { type TournamentState } from '@/app/types/tournament-state'
import { type Tournament } from '@/app/types/tournament'

interface Props {
  id: string
}

const HeaderShowTournament = async ({ id }: Props) => {
  const { getTournamentState, getTournament } = useDashboardServerSupabase()
  const dataTournament: Tournament = await getTournament(id)
  const dataState: TournamentState[] = await getTournamentState()
  return (
    <Menubar className="flex gap-2 text-sm px-4">
      <MenubarMenu>
        <SheetAward />
      </MenubarMenu>
      <MenubarMenu>
        <SheetSanction />
      </MenubarMenu>
      <MenubarMenu>
        <InitTournament dataState={dataState} dataTournament={dataTournament}/>
      </MenubarMenu>
    </Menubar>
  )
}

export default HeaderShowTournament
