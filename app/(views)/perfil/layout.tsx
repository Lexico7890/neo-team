import React from 'react'

const PerfilLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen'>
      <div className='p-2 sm:p-10 flex justify-center items-center '>
      {children}
      </div>
    </div>
  )
}

export default PerfilLayout
