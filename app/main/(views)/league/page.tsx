import CustomTable from '@/app/components/table'
import { type League } from '@/app/types/commonType'
import ButtonHeader from './components/button-header'

async function FetchLegue () {
  const result = await fetch(
    'https://run.mocky.io/v3/fe7ca563-db5c-42fd-8103-d7c404a86211'
  )
  if (!result.ok) {
    throw new Error('Algo salio mal ')
  }
  const data = await result.json()
  return data
}

const PageLeague = async () => {
  const dataLeague: League[] = await FetchLegue()
  return (
    <>
      {dataLeague.map(({ info, name }, index) => (
        <div
          key={index}
          className="flex flex-col w-full max-h-[500px] bg-slate-100 h-auto drop-shadow-lg dark:bg-[#27272B] p-2 mb-3"
        >
          <div className="inline-flex justify-between items-center mb-2">
            <span className="text-2xl">{name}</span>
            <ButtonHeader />
          </div>
          <div className="w-full h-full overflow-y-auto">
            <CustomTable info={info} />
          </div>
        </div>
      ))}
    </>
  )
}

export default PageLeague
