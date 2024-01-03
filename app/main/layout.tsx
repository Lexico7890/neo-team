import NavBar from '../components/server/navbar'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='p-2 sm:px-10 sm:pt-14 sm:pb-10 h-screen'>
      <NavBar />
      {children}
    </div>
  )
}

export default MainLayout
