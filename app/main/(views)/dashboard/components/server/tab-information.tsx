import CardInformation from '@/app/components/server/card-information'
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
  return (
    <section className='grid grid-cols-2 gap-4'>
      <article className='col-span-2 bg-red-400'>
        <CardInformation title='equipos' icon={<RiTeamFill />} value='24'/>
      </article>
      <article className="app dark:text-black border w-auto flex justify-center items-center">
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
      <article>
        safasdsad
      </article>
    </section>
  )
}

export default TabInformation
