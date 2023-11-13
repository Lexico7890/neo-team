import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET () {
  const data = await fetch(
    'https://run.mocky.io/v3/fe7ca563-db5c-42fd-8103-d7c404a86211'
  )
  if (!data.ok) {
    throw new Error('Error en la petición')
  }
  return data
}

export async function POST (request: NextRequest, response: NextResponse) {
  const { formData, award, idLeague, isEdit, idTournamentEdit } =
    await request.json()
  const supabase = createServerComponentClient({ cookies })
  if (isEdit === true) {
    await EditTournament(idTournamentEdit, supabase, idLeague, formData)
  }
  const idTournament = await CreateTournament(supabase, idLeague, formData)
  const isOk = await CreateAwards(supabase, award, idTournament)
  return NextResponse.json({ result: isOk })
}

async function CreateTournament (
  supabase: any,
  idLeague: string,
  formData: any
) {
  const { data, error } = await supabase
    .from('tournament')
    .insert({
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
    .select('id')
  if (error !== null) {
    throw new Error('Se produjo un error al intentar crear el torneo')
  }
  return data[0].id
}

async function EditTournament (
  id: string,
  supabase: any,
  idLeague: string,
  formData: any
) {
  const { data, error } = await supabase
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
    throw new Error('Se produjo un error al intentar crear el torneo')
  }
  return data[0].id
}

async function CreateAwards (
  supabase: any,
  awards: [{ name: string, value: number }],
  idTournament: any
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

async function EditAwards () {

}
