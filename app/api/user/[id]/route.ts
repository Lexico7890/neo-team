import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST (request: NextRequest) {
  const requestURL = new URL(request.url)
  const id = requestURL.pathname.split('/')[3]
  const { userData } = await request.json()
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.from('users').update({
    name: userData.nameUser,
    email: userData.emailUser,
    phone_number: userData.phoneNumber,
    rol_id: userData.rol,
    bird_date: userData.dateBirth,
    position_id: userData.position,
    is_completed: true,
    gender: userData.gender,
    number_identity: userData.numberIdentity
  })
    .eq('id', id)
    .select('*')
  if (error !== null) {
    console.log(error)
  }
  return NextResponse.json({ result: data })
}
