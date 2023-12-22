import { type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export async function POST (req: NextRequest) {
  const { teamData, userId } = await req.json()
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.from('team').insert({
    name: teamData.name,
    image: teamData.imageTeam,
    main_color: teamData.firstColor,
    second_color: teamData.secondColor
  }).select('*')
  if (error !== null) {
    throw new Error('Se produjo un error al intentar crear el equipo')
  }
  const { error: errorTeamUser } = await supabase.from('team_user').insert({
    user_id: userId,
    team_id: data[0].id
  })
  if (errorTeamUser !== null) {
    throw new Error('Se produjo un error al intentar ingresar el jugador al equipo')
  }
  return new Response(JSON.stringify(data[0]), { status: 200 })
}
