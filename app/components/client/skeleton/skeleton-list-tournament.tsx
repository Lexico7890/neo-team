import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const SkeletonListTournament = () => {
  return (
    <div className="flex items-center h-full space-x-4 w-full">
      <div className="space-y-2 w-full h-full">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  )
}

export default SkeletonListTournament
