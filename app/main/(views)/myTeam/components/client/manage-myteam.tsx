'use client'

import CardsSelectOption from '../server/cards-select-option'

interface Props {
  teamData: any[]
}

const ManageMyteam = ({ teamData }: Props) => {
  console.log(teamData)
  return (
    <div className='min-h-screen w-full flex justify-center items-center'>
      <CardsSelectOption />
    </div>
  )
}

export default ManageMyteam
