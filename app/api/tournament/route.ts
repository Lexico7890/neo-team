import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

const supabase = createServerComponentClient({ cookies })

export async function POST (request: NextRequest) {
  const { formData, idLeague } = await request.json()
  const { data, error } = await supabase
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
  return NextResponse.json({ result: data })
}

export async function PUT (request: NextRequest, response: NextResponse) {
  const { idTournamentEdit, formData, idLeague } = await request.json()
  const isOk = await EditTournament(idTournamentEdit, supabase, idLeague, formData)
  return NextResponse.json({ result: isOk })
}

async function EditTournament (
  id: string,
  supabase: any,
  idLeague: string,
  formData: any
) {
  const { error } = await supabase
    .from('tournament')
    .update({
      name: formData.nameTournament,
      value: formData.valueTournament,
      description: formData.description,
      category: formData.category,
      gender: formData.gender,
      variant: formData.variant,
      contact_name: formData.contactName,
      contact_number: formData.contactNumber,
      league_id: idLeague
    })
    .eq('id', id)
    .select('id')
  if (error !== null) {
    throw new Error('Se produjo un error al intentar editar el torneo')
  }
  return true
}

async function CreateAwards (
  supabase: any,
  idTournament: any,
  awards: [{ name: string, value: number }]
) {
  const awardsWithIdTournament = awards.map((item) => ({
    ...item,
    tournament_id: idTournament
  }))
  awardsWithIdTournament.map(async (item) => {
    const { error } = await supabase
      .from('award')
      .insert({
        name: item.name,
        value: item.value,
        tournament_id: item.tournament_id
      })
      .select('id')
    if (error !== null) {
      throw new Error(
        'Se produjo un error al intentar crear la premiacion ',
        error
      )
    }
  })
  return true
}

async function EditAwards (
  supabase: any,
  awards: [{ id: string, name: string, value: number }],
  idTournament: any
) {
  const awardsWithIdTournament = awards.map((item) => ({
    ...item,
    tournament_id: idTournament
  }))
  awardsWithIdTournament.map(async (item) => {
    const { error } = await supabase
      .from('award')
      .update({
        name: item.name,
        value: item.value,
        tournament_id: item.tournament_id
      })
      .eq('id', item.id)
      .select('id')
    if (error !== null) {
      throw new Error(
        'Se produjo un error al intentar crear la premiacion ',
        error
      )
    }
  })
  return true
}
