import { NextResponse, type NextRequest } from 'next/server'

import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export async function POST (request: NextRequest) {
  const supabase = createServerComponentClient({ cookies })
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

export async function DELETE (request: NextRequest) {
  const supabase = createServerComponentClient({ cookies })
  const { id } = await request.json()
  const { error: errorDelete } = await supabase.from('sanction').delete().eq('id', id)
  if (errorDelete !== null) {
    throw new Error(errorDelete.message)
  }
  const { data, error } = await supabase.from('sanction').select('*')
  if (error !== null) {
    throw new Error(error.message)
  }
  return NextResponse.json({ result: data })
}
