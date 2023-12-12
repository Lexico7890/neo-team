import {
  Card,
  CardContent,
  CardHeader
} from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

interface Props {
  dateMatch: string
  imageTeamOne: string
  imageTeamTwo: string
  nameTeamOne: string
  nameTeamTwo: string
}

const CardMatch = ({
  dateMatch,
  imageTeamOne,
  imageTeamTwo,
  nameTeamOne,
  nameTeamTwo
}: Props) => {
  return (
    <Card className="w-auto h-auto">
      <CardHeader className="flex items-center py-2 px-6">
        <span>{dateMatch}</span>
      </CardHeader>
      <CardContent className="pb-2 px-2 md:px-6 flex justify-around items-center">
        <div className='flex flex-col items-center'>
          <Image
            src={imageTeamOne}
            height={50}
            width={50}
            alt="image tema one"
          />{' '}
          {nameTeamOne}
        </div>
        <div>VS</div>
        <div className='flex flex-col items-center'>
          <Image
            src={imageTeamTwo}
            height={50}
            width={50}
            alt="image tema two"
          />{' '}
          {nameTeamTwo}
        </div>
      </CardContent>
    </Card>
  )
}

export default CardMatch
