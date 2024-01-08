import { type Tournament } from '@/app/types/tournament'
import TableListTournament from '../client/table-list-tournament'

interface Props {
  tournamentData: Tournament[]
}
const ComponentListTournament = ({ tournamentData }: Props) => {
  return (
    <div className="border h-full rounded-lg overflow-auto">
      <TableListTournament tournamentData={tournamentData} />
    </div>
  )
}

export default ComponentListTournament
