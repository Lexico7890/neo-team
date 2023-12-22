import { Suspense } from 'react'
import CardsSelectOption from '../server/cards-select-option'
import InformationMyteam from '../server/information-myteam'
import { type Team } from '@/app/types/team'

interface Props {
  teamData: Team[]
  userId: string | undefined
}

const ManageMyteam = ({ teamData, userId }: Props) => {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      {teamData.length === 0
        ? (
        <CardsSelectOption userId={userId}/>
          )
        : (
        <InformationMyteam teamData={teamData} />
          )}
    </Suspense>
  )
}

export default ManageMyteam
