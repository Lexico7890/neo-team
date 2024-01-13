import { Suspense } from 'react'
import BottomCreateTournament from './components/client/bottom-create-tournament'
import ComponentDashboard from './components/server/component-dashboard'
import SkeletonListTournament from '@/app/components/client/skeleton/skeleton-list-tournament'

const DashboardPage = () => {
  return (
    <main className="flex flex-col h-full">
      <Suspense fallback={<SkeletonListTournament />}>
        <ComponentDashboard />
      </Suspense>
      <div className="absolute bottom-6 right-6">
        <BottomCreateTournament />
      </div>
    </main>
  )
}

export default DashboardPage
