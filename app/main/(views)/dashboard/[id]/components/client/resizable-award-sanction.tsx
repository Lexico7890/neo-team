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
import ProgressDelete from './progress-delete'

interface Props {
  dataAwards: Award[]
  dataSanction: Sanction[]
}

async function FetchDelete (id: string, table: 'award' | 'sanction' = 'award') {
  const result = await fetch(`/api/${table}`, {
    method: 'DELETE',
    body: JSON.stringify({ id })
  })
  if (!result.ok) {
    throw new Error(result.statusText)
  }
  const data = await result.json()
  console.log('data ', data)
  return data.result
}

const ResizableAwardSanction = ({ dataAwards, dataSanction }: Props) => {
  const [currentAward, setCurrentAward] = useState<Award[]>([])
  const [currentSanction, setCurrentSanction] = useState<Sanction[]>([])
  const [selectedId, setSelectedId] = useState<string>('')
  const [deleteTable, setDeleteTable] = useState<'award' | 'sanction'>('award')
  const [keepDelete, setKeepDelete] = useState<boolean>(false)
  const [
    award,
    resetAward,
    setAwardArray,
    sanction,
    resetSanction,
    setSanctionArray
  ] = useSupabaseStore((state) => [
    state.award,
    state.resetAward,
    state.setAwardArray,
    state.sanction,
    state.resetSanction,
    state.setSanctionArray
  ])

  const handleDeleteItem = async () => {
    const array = await FetchDelete(selectedId, deleteTable)
    if (deleteTable === 'award') {
      setAwardArray(array)
    } else {
      setSanctionArray(array)
    }
  }

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

  return (
    <div className="relative min-h-[200px] w-full h-full border rounded-xl">
      <ResizablePanelGroup direction="horizontal" className="w-full">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full justify-center items-center p-6">
            {currentAward.length === 0
              ? (
              <div className="text-center">
                <span className="font-semibold text-lg">Premiaciones</span>
                <p className="text-sm">
                  No hay premiaciones creadas a la fecha
                </p>
              </div>
                )
              : (
              <div className="overflow-auto max-h-80 w-full">
                <TableAwardList
                  currentAward={currentAward}
                  setKeepDelete={setKeepDelete}
                  setSelectedId={setSelectedId}
                  setDeleteTable={setDeleteTable}
                />
              </div>
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
              <div className="overflow-auto max-h-80 w-full">
                <TableSanctionList
                  currentSanction={currentSanction}
                  setKeepDelete={setKeepDelete}
                  setSelectedId={setSelectedId}
                  setDeleteTable={setDeleteTable}
                />
              </div>
                )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      {keepDelete && (
        <ProgressDelete
          handleDeleteItem={handleDeleteItem}
          setKeepDelete={setKeepDelete}
        />
      )}
    </div>
  )
}

export default ResizableAwardSanction
