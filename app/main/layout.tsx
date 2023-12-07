import NavBar from '../components/server/navbar'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  )
}

export default MainLayout
