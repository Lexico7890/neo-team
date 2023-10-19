'use client'

import React, { useEffect, useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  ButtonGroup
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import FootyBallLogo from '../assets/footy-ball-logo'
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs'
import { useTheme } from 'next-themes'
import {
  type Session,
  createClientComponentClient
} from '@supabase/auth-helpers-nextjs'
import ButtonUserMovil from './button-user-movil'

export default function NavBar () {
  const supabase = createClientComponentClient()
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
    }
    getSession()
  }, [])

  if (!mounted) return null
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <Link href='/'>
        <FootyBallLogo height={120} width={120} />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem >
          <div className="hidden sm:flex items-center gap-4">
            <ButtonGroup size="sm" variant="bordered">
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
            {session === null
              ? (
                <>
                <Button
                as={Link}
                color="primary"
                href="#"
                variant="flat"
                onClick={() => {
                  router.push('/login')
                }}
                radius="none"
              >
                Ingresar
              </Button>
                </>
                )
              : (
                <ButtonUserMovil />
                )}
          </div>
          <div className='sm:hidden'>
          {session === null
            ? (
                <>
                <Button
                as={Link}
                color="primary"
                href="#"
                variant="flat"
                onClick={() => {
                  router.push('/login')
                }}
                radius="none"
              >
                Ingresar
              </Button>
                </>
              )
            : (
                <ButtonUserMovil />
              )}
          </div>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
