import { NextResponse, type NextRequest } from 'next/server'

import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createServerComponentClient({ cookies })

export async function POST (request: NextRequest) {
  const { formData, tournamentId } = await request.json()
  const { data, error } = await supabase.from('sanction').insert({
    name: formData.name,
    description: formData.description,
    value: formData.value,
    tournament_id: tournamentId
  }).select('*')
  if (error !== null) {
    throw new Error(error.message)
  }
  return NextResponse.json({ result: data })
}
