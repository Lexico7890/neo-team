'use client'

import {
  Avatar,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs'

const ButtonUserMovil = () => {
  const [mounted, setMounted] = useState(false)

  const supabase = createClientComponentClient()
  const { setTheme } = useTheme()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="system">
          <ButtonGroup size="sm" variant="bordered" className="sm:hidden">
            <Button
              onClick={() => {
                setTheme('dark')
              }}
            >
              <BsMoonStarsFill />
            </Button>
            <Button
              onClick={() => {
                setTheme('light')
              }}
            >
              <BsFillSunFill />
            </Button>
          </ButtonGroup>
        </DropdownItem>
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Navegas como</p>
          <p className="font-semibold">zoey@example.com</p>
        </DropdownItem>
        <DropdownItem key="settings">Mi perfil</DropdownItem>
        <DropdownItem key="team_settings">Mis estadísticas</DropdownItem>
        <DropdownItem key="creation team">
          <Link href="/creationCenter">Centro de creación</Link>
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
          Salir
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default ButtonUserMovil
