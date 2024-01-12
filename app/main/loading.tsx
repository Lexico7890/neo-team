import React from 'react'
import FootyBallLogo from '../assets/footy-ball-logo'

const LoadingPage = () => {
  return (
    <div className='h-full flex justify-center items-center'>
      <div className='flex flex-col items-center font-semibold text-lg'>
        <FootyBallLogo height={300} width={300}/>
        Cargando información, por favor espere....
      </div>
    </div>
  )
}

export default LoadingPage
