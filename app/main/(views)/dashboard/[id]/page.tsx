import CardInformation from '@/app/components/server/card-information'
import CardMatch from '@/app/components/server/card-match'
import { RiTeamFill } from 'react-icons/ri'
import BarChart from './components/client/bar-chart'
import useDashboardServerSupabase from '@/app/hooks/useDashboardServerSupabase'
import { type TournamentGeneral } from '@/app/types/function/tournamentGeneral'
import { type MatchShowCardTournament } from '@/app/types/function/matchShowCardTournament'
import { Suspense } from 'react'
import BottomBack from './components/client/bottom-back'
import HeaderShowTournament from './components/client/header-show-tournament'

const DATA = {
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
}

const Page = async ({ params }: { params: { id: string } }) => {
  const { tournamentGeneralInfo, getMatchTournament } =
    useDashboardServerSupabase()
  const data: TournamentGeneral = await tournamentGeneralInfo(params.id)
  const dataMatch: MatchShowCardTournament = await getMatchTournament(
    params.id
  )
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
    <div className="flex flex-col gap-2">
      <header className="p-2 flex justify-between">
        <BottomBack />{' '}
        <HeaderShowTournament id={params.id} />
      </header>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full lg:grid-rows-5">
        <Suspense fallback={<p>Cargando...</p>}>
          <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:col-span-2 gap-4 max-h-[112px] lg:row-start-1 lg:row-end-2">
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
          <article className="app dark:text-black border flex justify-center items-center overflow-x-auto w-full max-h-[500px] min-h-[400px] lg:row-start-2 lg:row-end-6">
            <BarChart data={DATA} />
          </article>
          <article className="flex flex-col gap-2 w-full overflow-auto border p-2 max-h-[500px] min-h-[400px] lg:row-start-2 lg:row-end-6">
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
