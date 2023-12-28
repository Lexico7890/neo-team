import React from 'react'

const Page = ({ params }: { params: { id: string } }) => {
  console.log(params)
  return (
    <div>page</div>
  )
}

export default Page
