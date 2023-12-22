import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import ManageMyteam from './components/client/manage-myteam'

export default async function PageMyTeam () {
  let userid: string
  let teamData: any
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  if (session !== null) {
    userid = session?.user.id
    const { data: teamUser, error } = await supabase.rpc('get_team_user_id', { userid })
    if (error !== null) {
      throw new Error('No se pudo completar la consulta de usuarios y equipos')
    }
    teamData = teamUser
  }
  return <ManageMyteam teamData={teamData} userId={session?.user.id}/>
}
