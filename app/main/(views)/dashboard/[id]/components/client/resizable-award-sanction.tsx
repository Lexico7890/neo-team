'use client'

import { type Award } from '@/app/types/award'
import { useSupabaseStore } from '@/app/zustand/store'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'

import { useEffect, useState } from 'react'
import TableAwardList from './table-award-list'
import { type Sanction } from '@/app/types/sanction'
import TableSanctionList from './table-sanction-list'

interface Props {
  dataAwards: Award[]
  dataSanction: Sanction[]
}

const ResizableAwardSanction = ({ dataAwards, dataSanction }: Props) => {
  const [currentAward, setCurrentAward] = useState<Award[]>([])
  const [currentSanction, setCurrentSanction] = useState<Sanction[]>([])
  const [award, resetAward, setAwardArray, sanction, resetSanction, setSanctionArray] = useSupabaseStore((state) => [
    state.award,
    state.resetAward,
    state.setAwardArray,
    state.sanction,
    state.resetSanction,
    state.setSanctionArray
  ])

  useEffect(() => {
    setCurrentAward(award)
  }, [award])

  useEffect(() => {
    setCurrentSanction(sanction)
  }, [sanction])

  useEffect(() => {
    resetAward()
    resetSanction()
    setCurrentAward(dataAwards)
    setAwardArray(dataAwards)
    setCurrentSanction(dataSanction)
    setSanctionArray(dataSanction)
  }, [dataAwards, dataSanction])

  console.log(dataSanction)

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] w-full border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          {currentAward.length === 0
            ? (
            <div className="text-center">
              <span className="font-semibold text-lg">Premiaciones</span>
              <p className="text-sm">No hay premiaciones creadas a la fecha</p>
            </div>
              )
            : (
            <TableAwardList currentAward={currentAward} />
              )}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
        {currentSanction.length === 0
          ? (
            <div className="text-center">
              <span className="font-semibold text-lg">Sanciones</span>
              <p className="text-sm">No hay sanciones creadas a la fecha</p>
            </div>
            )
          : (
            <TableSanctionList currentSanction={currentSanction} />
            )}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default ResizableAwardSanction
