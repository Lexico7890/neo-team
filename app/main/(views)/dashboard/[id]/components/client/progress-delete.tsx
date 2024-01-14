import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { useEffect, useState } from 'react'

interface Props {
  handleDeleteItem: () => void
  setKeepDelete: (keepDelete: boolean) => void
}

const ProgressDelete = ({ handleDeleteItem, setKeepDelete }: Props) => {
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      // Incrementa el progreso en cada intervalo
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          handleDeleteItem()
          setTimeout(() => {
            setKeepDelete(false)
            clearInterval(interval)
          }, 500)
          return 0
        }
        return prevProgress + 33 // Puedes ajustar este valor según tus necesidades
      })
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <Alert className="absolute bottom-0 left-0">
      <AlertTitle>Eliminando...</AlertTitle>
      <AlertDescription>
        <Progress value={progress} />
      </AlertDescription>
    </Alert>
  )
}

export default ProgressDelete
