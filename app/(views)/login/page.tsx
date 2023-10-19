'use client'

import FootyBallLogo from '@/app/assets/footy-ball-logo'
import { Button } from '@nextui-org/react'
import { BsGoogle, BsPhoneFill, BsDiscord } from 'react-icons/bs'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const LoginPage = () => {
  const supabase = createClientComponentClient()

  const handleLoginDiscord = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord'
    })
    if (error !== null) {
      throw new Error('No se pudo completar el ingreso')
    }
    console.log(data)
  }

  const handleLoginGoogle = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })
    if (error !== null) {
      throw new Error('No se pudo completar el ingreso')
    }
    console.log(data)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-65px)] justify-around">
      <div className=" flex justify-center items-center md:pl-8 pl-3 max-h-96">
        <FootyBallLogo height={500} width={500} />
      </div>
      <div className="flex flex-col gap-5 sm:flex-row sm:justify-center items-center p-2">
        <Button
          color="secondary"
          endContent={<BsDiscord />}
          radius="none"
          className="w-[198px]"
          onClick={(e) => { handleLoginDiscord(e) }}
        >
          Continue con Discord
        </Button>
        <Button
          color="primary"
          endContent={<BsGoogle />}
          radius="none"
          className="w-[198px]"
          onClick={(e) => { handleLoginGoogle(e) }}
        >
          Continue con google
        </Button>
        <Button
          color="danger"
          endContent={<BsPhoneFill />}
          radius="none"
          className="w-[198px]"
        >
          Continua con tu celular
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
