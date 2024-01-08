import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST (request: NextRequest) {
  const supabase = createServerComponentClient({ cookies })
  const { formData, idLeague } = await request.json()
  const { error } = await supabase
    .from('tournament')
    .insert({
      name: formData.nameTournament,
      value: formData.valueTournament,
      description: formData.description,
      category: formData.category,
      gender: formData.gender,
      sub_category: formData.subCategory,
      contact_name: formData.contactName,
      contact_number: formData.contactNumber,
      league_id: idLeague,
      isFlag: false
    })
    .select('*')
  if (error !== null) {
    throw new Error('Se produjo un error al intentar crear el torneo')
  }
  const { data, error: errorListTournament } = await supabase.rpc(
    'get_tournaments_id',
    { leagueid: idLeague }
  )
  if (errorListTournament !== null) {
    throw new Error(errorListTournament.message)
  }
  return NextResponse.json({ result: data })
}

export async function PUT (request: NextRequest, response: NextResponse) {
  const supabase = createServerComponentClient({ cookies })
  const { formData, tournamentId } = await request.json()
  const { data, error } = await supabase.from('tournament').update({
    name: formData.nameTournament,
    value: formData.valueTournament,
    description: formData.description,
    category: formData.category,
    gender: formData.gender,
    sub_category: formData.subCategory,
    contact_name: formData.contactName,
    contact_number: formData.contactNumber,
    isFlag: false,
    state_id: formData.stateId
  }).eq('id', tournamentId).select('*')
  if (error !== null) {
    throw new Error('Se produjo un error al intentar crear el torneo')
  }
  return NextResponse.json({ result: data })
}
