import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

interface Props {
  title: string
  icon: JSX.Element
  value: string
}

const CardInformation = ({ icon, title, value }: Props) => {
  return (
    <Card className="w-auto h-28 grid grid-rows-2">
      <CardHeader className="grid grid-cols-3 items-center py-2 px-6">
        <span className='text-xl font-semibold col-span-2'>{title}</span>
        <span className='flex justify-end m-0'>{icon}</span>
      </CardHeader>
      <CardContent className='pb-2 px-6'><span className='text-4xl font-bold text-center'>{value}</span></CardContent>
    </Card>
  )
}

export default CardInformation
