'use client'

import { useSupabaseStore } from '@/app/zustand/store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TabInformation from './server/tab-information'
import TabTeams from './server/tab-teams'
import TabMatch from './server/tab-match'

const Dashboard = () => {
  const [tournamentSelect] = useSupabaseStore((state) => [
    state.tournamentSelect,
    state.resetTournament
  ])
  /* useEffect(() => {
    resetAllSlices()
  }, []) */
  return (
    <section className="h-full">
      <h2 className="text-4xl font-bold">Dashboard {tournamentSelect.name}</h2>
      <Tabs defaultValue="information" className="w-full">
        <TabsList>
          <TabsTrigger value="information">Información</TabsTrigger>
          <TabsTrigger value="account">Equipos</TabsTrigger>
          <TabsTrigger value="password">Partidos</TabsTrigger>
        </TabsList>
        <TabsContent value="information">
          <TabInformation />
        </TabsContent>
        <TabsContent value="account">
          <TabTeams />
        </TabsContent>
        <TabsContent value="password">
          <TabMatch />
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default Dashboard
