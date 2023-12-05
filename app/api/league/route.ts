import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST (request: NextRequest, response: NextResponse) {
  const { formData, idUser, isEdit, informationLeague } = await request.json()
  const supabase = createServerComponentClient({ cookies })
  let idLeague: any
  if (isEdit === true) {
    idLeague = await UpdateLeague(
      supabase,
      informationLeague,
      formData.nameLeague,
      formData.imageLeague
    )
  } else {
    idLeague = await CreateLeague(
      supabase,
      idUser,
      formData.nameLeague,
      formData.imageLeague
    )
  }
  if (idLeague === '23505') {
    return NextResponse.json(
      { result: 'Internal server Error' },
      {
        status: 500,
        statusText: 'El nombre de la liga ya existe, intenta con otro'
      }
    )
  }
  return NextResponse.json({ result: idLeague })
}

async function CreateLeague (
  supabase: any,
  id: string,
  nameLeague: string,
  image: File
) {
  const { data: league, error } = await supabase
    .from('league')
    .insert({
      name: nameLeague,
      createdBy: id,
      url_image: image
    })
    .select('*')
  if (error !== null) {
    return error.code
  }
  return league[0]
}

async function UpdateLeague (
  supabase: any,
  informationLeague: any,
  nameLeague: string,
  image: File
) {
  const { data: league, error } = await supabase
    .from('league')
    .update({
      id: informationLeague.id,
      name: nameLeague,
      url_image: image,
      createdBy: informationLeague.createdBy,
      created_at: informationLeague.created_at
    })
    .eq('id', informationLeague.id)
    .select('*')
  if (error !== null) {
    return error.code
  }
  return league[0]
}
