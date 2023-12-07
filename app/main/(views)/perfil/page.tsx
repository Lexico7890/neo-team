import useSession from '@/app/hooks/useSession'

import { redirect } from 'next/navigation'
import UserInformation from './client/user-information'

const PerfilPage = async () => {
  const { session, supabase } = await useSession()
  const { data: rol } = await supabase.from('rol').select('*').eq('show', true)
  const { data: position } = await supabase.from('team_position').select('*')
  const { data: gender } = await supabase.from('gender').select('*').ilike('name', '%ino%')
  if (session === null) return redirect('/')
  return <UserInformation items={rol} position={position} gender={gender}/>
}

export default PerfilPage
