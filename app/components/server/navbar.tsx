import {
  createServerComponentClient
} from '@supabase/auth-helpers-nextjs'
import NavbarMenu from '../client/navbar-menu'
import { cookies } from 'next/headers'

export default async function NavBar () {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  const { data: userData } = await supabase.from('users').select('*').eq('id', session?.user.id)
  const { data: rolData } = await supabase.from('rol').select('*')
  return <NavbarMenu user={userData} rol={rolData}/>
}
