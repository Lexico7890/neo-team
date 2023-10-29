'use client'

import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

const ButtonListLeague = () => {
  const router = useRouter()
  return (
    <Button
      onClick={() => {
        router.push('/league')
      }}
      variant="bordered"
      className="border-2 border-[#111111] text-black text-lg dark:text-white dark:border-white"
    >
      Ver liga
    </Button>
  )
}

export default ButtonListLeague
