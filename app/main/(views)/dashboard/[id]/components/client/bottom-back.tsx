'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const BottomBack = () => {
  const route = useRouter()
  return (
    <Button variant='ghost' onClick={() => { route.back() }}>
      Volver
    </Button>
  )
}

export default BottomBack
