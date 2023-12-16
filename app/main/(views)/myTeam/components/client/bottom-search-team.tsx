import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface Props {
  name: string
}

const BottomSearchTeam = ({ name }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
      <Button
      variant={'outline'}
      className="dark:bg-black bg-white font-semibold text-lg"
    >
      {name}
    </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Encontrar equipo</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default BottomSearchTeam
