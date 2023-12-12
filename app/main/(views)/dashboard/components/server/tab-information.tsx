'ue client'

import CardInformation from '@/app/components/server/card-information'
import CardMatch from '@/app/components/server/card-match'
import { useState } from 'react'
import Chart from 'react-apexcharts'
import { RiTeamFill } from 'react-icons/ri'

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

const TabInformation = () => {
  const [array, setArray] = useState<number[]>([1, 1, 1, 1])
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:col-span-2 gap-4">
        <CardInformation title="equipos" icon={<RiTeamFill />} value="+20" />
        <CardInformation title="partidos" icon={<RiTeamFill />} value="+15" />
        <CardInformation
          title="inscripción"
          icon={<RiTeamFill />}
          value="$2'500.000"
        />
        <CardInformation title="Ultima fecha" icon={<RiTeamFill />} value="10" />
      </article>
      <article className="app dark:text-black border flex justify-center items-center overflow-x-auto w-full h-[375px]">
        <div className="row ">
          <div className="mixed-chart">
            <Chart
              options={DATA.options}
              series={DATA.series}
              type="bar"
              width="500"
            />
          </div>
        </div>
      </article>
      <article className="flex flex-col gap-2 w-full h-[375px] overflow-auto border p-2">
        {array.map((item, index) => (
          <CardMatch
            key={index}
            dateMatch="Sábado 10 FEB"
            imageTeamOne="https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/800px-Manchester_United_FC_crest.svg.png"
            imageTeamTwo="https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/800px-Manchester_City_FC_badge.svg.png"
            nameTeamOne="Manchester United"
            nameTeamTwo="Manchester City"
          />
        ))}
      </article>
    </section>
  )
}

export default TabInformation
