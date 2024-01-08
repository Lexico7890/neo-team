import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST (request: NextRequest, response: NextResponse) {
  const supabase = createServerComponentClient({ cookies })
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

export async function PUT (request: NextRequest, response: NextResponse) {
  const supabase = createServerComponentClient({ cookies })
  const { formData, imageUrl, leagueId } = await request.json()
  console.log(formData, imageUrl, leagueId)
  const { data: league, error } = await supabase
    .from('league')
    .update({
      name: formData.nameLeague,
      url_image: imageUrl
    })
    .eq('id', leagueId)
    .select('*')
  if (error !== null) {
    return error.code
  }
  return NextResponse.json({ result: league })
}
