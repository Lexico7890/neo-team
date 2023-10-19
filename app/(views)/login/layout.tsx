'use client'

import { Divider } from '@nextui-org/react'
import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs'

const LayoutLogin = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen'>
      <div className="bg-slate-50 dark:bg-black w-full flex h-auto text-center
      md:grid md:grid-cols-3 items-center relative z-10">
        <Link href="/">
          <div className="mx-4 flex items-center gap-2">
            <BsArrowLeft /> <span className='hidden sm:flex font-bold'>Volver</span>
          </div>
        </Link>
        <div className="flex justify-center font-black m-3 text-center w-full">
          <h1 className=''>Regístrate o ingresa para continuar</h1>
        </div>
      </div>
      <Divider />
      {children}
    </div>
  )
}

export default LayoutLogin
