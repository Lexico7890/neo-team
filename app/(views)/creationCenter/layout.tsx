import NavBar from '@/app/components/navbar'
import React from 'react'

const LayoutCreationCenter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  )
}

export default LayoutCreationCenter
