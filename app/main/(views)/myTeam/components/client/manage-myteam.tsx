import { Suspense } from 'react'
import CardsSelectOption from '../server/cards-select-option'
import InformationMyteam from '../server/information-myteam'
import { type Team } from '@/app/types/team'

interface Props {
  teamData: Team[]
}

const ManageMyteam = ({ teamData }: Props) => {
  console.log(teamData)
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      {teamData === null
        ? (
        <CardsSelectOption />
          )
        : (
        <InformationMyteam teamData={teamData} />
          )}
    </Suspense>
  )
}

export default ManageMyteam
