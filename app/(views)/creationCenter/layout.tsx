import NavBar from '@/app/components/navbar'
import React from 'react'

const LayoutCreationCenter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar />
      <div className='p-2 sm:p-10'>
      {children}
      </div>
    </div>
  )
}

export default LayoutCreationCenter
