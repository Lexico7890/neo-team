import React from 'react'

const LayoutCreationCenter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='p-2 sm:px-10 sm:pt-14 sm:pb-10 h-screen'>
      {children}
    </div>
  )
}

export default LayoutCreationCenter
