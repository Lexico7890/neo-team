import { type StateCreator } from 'zustand'
import { type Sanction } from '../types/sanction'

const sliceResetFns = new Set<() => void>()

const initialSanctionState = {
  sanction: [] as Sanction[]
}

export interface SanctionSlice {
  sanction: Sanction[]
  resetSanction: () => void
  setSanction: (newSanction: Sanction) => void
  setSanctionArray: (newSanction: Sanction[]) => void
}

export const createSanctionSlice: StateCreator<SanctionSlice> = (set) => {
  sliceResetFns.add(() => {
    set(initialSanctionState)
  })

  return {
    ...initialSanctionState,
    resetSanction: () => {
      sliceResetFns.forEach((fn) => { fn() })
    },
    setSanction: (newSanction) => {
      set((prev) => ({
        sanction: [...prev.sanction, newSanction]
      }))
    },
    setSanctionArray: (newSanction) => {
      set({ sanction: newSanction })
    }
  }
}
