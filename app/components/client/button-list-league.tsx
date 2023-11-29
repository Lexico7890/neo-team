'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const ButtonListLeague = () => {
  const router = useRouter()
  return (
    <Button
      onClick={() => {
        router.push('/league')
      }}
      variant="outline"
    >
      Ver liga
    </Button>
  )
}

export default ButtonListLeague
