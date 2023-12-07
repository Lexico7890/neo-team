import React from 'react'

const LayoutCreationCenter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className='p-2 sm:p-10'>
      {children}
      </div>
    </div>
  )
}

export default LayoutCreationCenter
