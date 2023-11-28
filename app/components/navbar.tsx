import {
  createServerComponentClient
} from '@supabase/auth-helpers-nextjs'
import NavbarMenu from './client/navbar-menu'
import { cookies } from 'next/headers'

export default async function NavBar () {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  return <NavbarMenu session={session} />
}
