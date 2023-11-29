import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import UserInformation from './client/user-information'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const PerfilPage = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  const { data: rol } = await supabase.from('rol').select('*').eq('show', true)
  const { data: position } = await supabase.from('team_position').select('*')
  if (session === null) return redirect('/')
  return <UserInformation items={rol} position={position}/>
}

export default PerfilPage