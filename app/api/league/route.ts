import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

const supabase = createServerComponentClient({ cookies })

export async function POST (request: NextRequest, response: NextResponse) {
  const { formData, idUser, imageUrl } = await request.json()
  const { data, error } = await supabase
    .from('league')
    .insert({
      name: formData.nameLeague,
      createdBy: idUser,
      url_image: imageUrl
    })
    .select('*')
  if (error !== null) {
    if (error.code === '23505') {
      return NextResponse.json(
        { result: 'Internal server Error' },
        {
          status: 500,
          statusText: 'El nombre de la liga ya existe, intenta con otro'
        }
      )
    }
    return error.code
  }
  return NextResponse.json({ result: data })
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
