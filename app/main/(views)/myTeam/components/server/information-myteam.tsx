import { type Team } from '@/app/types/team'
import Image from 'next/image'
import FootyLogo from '@/public/image/footyLogo.png'
import { Button } from '@/components/ui/button'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'

interface Props {
  teamData: Team[]
}

const InformationMyteam = ({ teamData }: Props) => {
  console.log(teamData)
  return (
    <section className="p-10 flex flex-col gap-4">
      <p className="text-4xl font-bold text-center">Información de mi equipo</p>
      <article className="flex justify-around items-center mt-4 border border-white">
        <Image
          src={teamData[0].image ?? FootyLogo}
          alt="image of team"
          height={250}
          width={250}
        />
        <div className="flex items-center gap-6">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="text-2xl">
                {teamData[0].name}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold">{teamData[0].name}</h4>
                  <p className="text-sm">
                    Colores principales:
                  </p>
                  <div className="flex">
                    <div
                      className={`h-6 w-6 bg-[${teamData[0].main_color}] border-2 border-white`}
                    ></div>
                    <div
                      className={`h-6 w-6 bg-[${teamData[0].second_color}] border-2 border-white`}
                    ></div>
                  </div>
                  <p className="text-sm">
                    equipo en competición desde:
                  </p>
                  <div className="flex items-center pt-2">
                    <IoCalendarNumberOutline className="mr-2 h-4 w-4 opacity-70" />{' '}
                    <span className="text-xs text-muted-foreground">
                      December 2021
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </article>
      <article className="flex justify-around items-center mt-4 border border-white">
        <p className="text-2xl font-bold text-center">Estadísticas</p>
      </article>
    </section>
  )
}

export default InformationMyteam
