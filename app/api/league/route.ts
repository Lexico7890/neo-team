import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST (request: NextRequest, response: NextResponse) {
  const { formData, idUser } = await request.json()
  const supabase = createServerComponentClient({ cookies })
  const idLeague = await CreateLeague(supabase, idUser, formData.nameLeague, formData.imageLeague)
  if (idLeague === '23505') {
    return NextResponse.json({ result: 'Internal server Error' }, { status: 500, statusText: 'El nombre de la liga ya existe, intenta con otro' })
  }
  return NextResponse.json({ result: idLeague })
}

async function CreateLeague (supabase: any, id: string, nameLeague: string, image: File) {
  const { data: league, error } = await supabase.from('league').insert({
    name: nameLeague,
    createdBy: id,
    url_image: image
  }).select('*')
  if (error !== null) {
    console.log('entro liga ', error)
    return error.code
  }
  return league[0].id
}
