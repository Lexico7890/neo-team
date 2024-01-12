import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET (request: NextRequest) {
  const supabase = createServerComponentClient({ cookies })
  const requestURL = new URL(request.url)
  const leagueid = requestURL.pathname.split('/')[3]
  const { data, error: errorListTournament } = await supabase.rpc(
    'get_tournaments_id',
    { leagueid }
  )
  if (errorListTournament !== null) {
    throw new Error(errorListTournament.message)
  }
  console.log('data ', data)
  return NextResponse.json({ result: data })
}
