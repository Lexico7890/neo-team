import React from 'react'

const LayoutCreationCenter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='p-2 sm:p-10 h-screen'>
      {children}
    </div>
  )
}

export default LayoutCreationCenter
