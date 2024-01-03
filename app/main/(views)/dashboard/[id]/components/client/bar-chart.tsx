'use client'

import Chart from 'react-apexcharts'

interface Props {
  data: any
}

const BarChart = ({ data }: Props) => {
  return (
    <div className="row ">
          <div className="mixed-chart">
            <Chart
              options={data.options}
              series={data.series}
              type="bar"
              width="500"
            />
          </div>
        </div>
  )
}

export default BarChart
