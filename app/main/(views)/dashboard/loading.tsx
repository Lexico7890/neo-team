import FootyBallLogo from '@/app/assets/footy-ball-logo'
import React from 'react'

const LoadingPageDashboard = () => {
  return (
    <div className='h-full flex justify-center items-center'>
      <div className='flex flex-col items-center font-semibold text-lg'>
        <FootyBallLogo height={300} width={300}/>
        Cargando información, por favor espere....
      </div>
    </div>
  )
}

export default LoadingPageDashboard
