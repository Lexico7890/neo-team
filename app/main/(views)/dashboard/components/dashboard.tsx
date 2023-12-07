'use client'

import { useSupabaseStore } from '@/app/zustand/store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Dashboard = () => {
  const [tournament] = useSupabaseStore(state => [state.tournament])
  return (
    <section>
      <h2 className="text-4xl font-bold">Dashboard {tournament.name}</h2>
      <Tabs defaultValue="account" className="w-full">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="w-full bg-red-400">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
    </section>
  )
}

export default Dashboard
