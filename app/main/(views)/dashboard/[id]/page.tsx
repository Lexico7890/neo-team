import CardInformation from '@/app/components/server/card-information'
import CardMatch from '@/app/components/server/card-match'
import { RiTeamFill } from 'react-icons/ri'
// import BarChart from './components/client/bar-chart'
import useDashboardServerSupabase from '@/app/hooks/useDashboardServerSupabase'
import { type TournamentGeneral } from '@/app/types/function/tournamentGeneral'
import { type MatchShowCardTournament } from '@/app/types/function/matchShowCardTournament'
import { Suspense } from 'react'
import BottomBack from './components/client/bottom-back'
import HeaderShowTournament from './components/client/header-show-tournament'
import ResizableAwardSanction from './components/client/resizable-award-sanction'
import { type Award } from '@/app/types/award'
import { type Sanction } from '@/app/types/sanction'

/* const DATA = {
  options: {
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  },
  series: [
    {
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
  ]
} */

const Page = async ({ params }: { params: { id: string } }) => {
  const { tournamentGeneralInfo, getMatchTournament, getAwardsOfTournament, getSanctionOfTournament } =
    useDashboardServerSupabase()
  const data: TournamentGeneral = await tournamentGeneralInfo(params.id)
  const dataMatch: MatchShowCardTournament = await getMatchTournament(
    params.id
  )
  const dataAwards: Award[] = await getAwardsOfTournament(params.id)
  const dataSanction: Sanction[] = await getSanctionOfTournament(params.id)
  const array: Array<{
    dateGame: string
    oneTeamId: string
    twoTeamId: string
    nameTeamOne: string
    nameTeamTwo: string
    imageTeamOne: string
    imageTeamTwo: string
    matchId: string
  }> = []
  for (let i = 0; i < dataMatch.length; i++) {
    // console.log(dataMatch[0].match_id, dataMatch[1].match_id)
    if (i < dataMatch.length - 1 && i % 2 === 0) {
      array.push({
        oneTeamId: dataMatch[i].team_id,
        twoTeamId: dataMatch[i + 1].team_id,
        dateGame: dataMatch[i].date_game,
        nameTeamOne: dataMatch[i].name,
        nameTeamTwo: dataMatch[i + 1].name,
        imageTeamOne: dataMatch[i].image_team,
        imageTeamTwo: dataMatch[i + 1].image_team,
        matchId: dataMatch[i].match_id
      })
    }
  }
  return (
    <div className="flex flex-col gap-2 h-full ">
      <header className="p-2 flex justify-between">
        <BottomBack />{' '}
        <HeaderShowTournament id={params.id} />
      </header>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        <Suspense fallback={<p>Cargando...</p>}>
          <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:col-span-2 gap-4 lg:max-h-[112px] lg:row-start-1 lg:row-end-2">
            <CardInformation
              title="equipos"
              icon={<RiTeamFill />}
              value={data[0].total_teams.toString()}
            />
            <CardInformation
              title="partidos"
              icon={<RiTeamFill />}
              value={data[0].total_matches_played.toString()}
            />
            <CardInformation
              title="inscripción"
              icon={<RiTeamFill />}
              value={data[0].total_payment_subscription === null ? '0' : `$${data[0].total_payment_subscription.toString()}`}
            />
            <CardInformation
              title="Jugadores"
              icon={<RiTeamFill />}
              value={data[0].total_players.toString()}
            />
          </article>
          <article className="flex justify-center items-center w-full min-h-[400px] row-start-2 row-end-7">
            <ResizableAwardSanction dataAwards={dataAwards} dataSanction={dataSanction}/>
          {/* <div className='h-full flex justify-center items-center text-lg font-bold'>No hay datos que mostrar</div> */}
            {/* <BarChart data={DATA} /> */}
          </article>
          <article className="flex flex-col gap-2 w-full overflow-auto border p-2 min-h-[400px] lg:row-start-2 lg:row-end-7">
            {array.length > 0
              ? (array.map(
                  ({
                    dateGame,
                    imageTeamOne,
                    imageTeamTwo,
                    matchId,
                    nameTeamOne,
                    nameTeamTwo
                  }) => (
                <CardMatch
                  key={matchId}
                  dateMatch={dateGame}
                  imageTeamOne={imageTeamOne}
                  imageTeamTwo={imageTeamTwo}
                  nameTeamOne={nameTeamOne}
                  nameTeamTwo={nameTeamTwo}
                />
                  )
                ))
              : <div className='h-full flex justify-center items-center text-lg font-bold'>No hay partidos creados hasta el momento</div>}
          </article>
        </Suspense>
      </section>
    </div>
  )
}

export default Page
