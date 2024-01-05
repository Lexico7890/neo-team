import { Menubar, MenubarMenu } from '@/components/ui/menubar'
import React from 'react'
import SheetAward from './sheet-award'
import SheetSanction from './sheet-sanction'
import InitTournament from './init-tournament'

const HeaderShowTournament = () => {
  return (
    <Menubar className="flex gap-2 text-sm px-4">
      <MenubarMenu>
        <SheetAward />
      </MenubarMenu>
      <MenubarMenu>
        <SheetSanction />
      </MenubarMenu>
      <MenubarMenu>
        <InitTournament />
      </MenubarMenu>
    </Menubar>
  )
}

export default HeaderShowTournament
