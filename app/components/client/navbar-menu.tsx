'use client'

import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { forwardRef, useEffect } from 'react'
import FootyBallLogo from '../../assets/footy-ball-logo'
import { ButtonDarkMode } from './button-dark-mode'
import ButtonLogin from './button-login'
import { useSupabaseStore } from '@/app/zustand/store'
import Link from 'next/link'
import { type User } from '@sentry/nextjs'

const components: Array<{ title: string, href: string, description: string }> =
  [
    {
      title: 'Ligas',
      href: '/docs/primitives/alert-dialog',
      description: 'Encuentra todas las ligas en las que puedes participar'
    },
    {
      title: 'Equipos',
      href: '/docs/primitives/hover-card',
      description: 'Consulta información de tus rivales o futuros equipos'
    },
    {
      title: 'Jugadores',
      href: '/docs/primitives/progress',
      description: 'Ver información de otros participantes, estadísticas y mas'
    },
    {
      title: 'Próximas fechas',
      href: '/docs/primitives/scroll-area',
      description: 'Mira los partidos que se aproximan, programate'
    }
  ]

const NavbarMenu = ({ user }: { user: User | null }) => {
  const [setUser] = useSupabaseStore((state) => [
    state.setUser
  ])
  useEffect(() => {
    if (user !== null) {
      setUser(user[0])
    }
  }, [user])
  return (
    <>
      {user === null
        ? (
        <nav className="flex justify-between items-center w-full h-16 px-10 py-2">
          <div>
            <Link href='/'>
            <FootyBallLogo height={120} width={120} />
            </Link>
          </div>
          <div className="flex gap-2">
            <ButtonDarkMode />
            <ButtonLogin />
          </div>
        </nav>
          )
        : (
        <div className="p-2 flex justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Información</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <FootyBallLogo height={120} width={120} />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Bienvenido
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {user[0].name}
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/perfil" title="Mi perfil">
                      Gestiona y actualiza tus datos personales
                    </ListItem>
                    <ListItem href="/creationCenter" title="Dashboard">
                      Crea nuevas ligas, equipos y todo lo necesario para tu
                      torneo
                    </ListItem>
                    <ListItem href="/docs/primitives/typography" title="Salir">
                      Vuelve pronto, te esperamos
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Mas opciones</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <ButtonDarkMode />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
          )}
    </>
  )
}

const ListItem = forwardRef<
React.ElementRef<'a'>,
React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

export default NavbarMenu
