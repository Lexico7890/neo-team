import { type StateCreator } from 'zustand'
import { type Award } from '../types/award'

const sliceResetFns = new Set<() => void>()

const initialAwardState = {
  award: [] as Award[]
}

export interface AwardSlice {
  award: Award[]
  resetAward: () => void
  setAward: (newAward: Award) => void
  setAwardArray: (newAward: Award[]) => void
}

export const createAwardSlice: StateCreator<AwardSlice> = (set) => {
  sliceResetFns.add(() => {
    set(initialAwardState)
  })

  return {
    ...initialAwardState,
    resetAward: () => {
      sliceResetFns.forEach((fn) => { fn() })
    },
    setAward: (newAward) => {
      set((prev) => ({
        award: [...prev.award, newAward]
      }))
    },
    setAwardArray: (newAward) => {
      set({ award: newAward })
    }
  }
}
