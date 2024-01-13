import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function POST (request: NextRequest) {
  const supabase = createServerComponentClient({ cookies })
  const { formData, tournamentId } = await request.json()
  const { data, error } = await supabase.from('award').insert({
    name: formData.nameAward,
    value: formData.value,
    tournament_id: tournamentId
  }).select('*')
  if (error !== null) {
    throw new Error(error.message)
  }
  return NextResponse.json({ result: data })
}

export async function DELETE (request: NextRequest) {
  const supabase = createServerComponentClient({ cookies })
  const { id } = await request.json()
  const { data, error } = await supabase.from('award').delete().match({ id })
}
