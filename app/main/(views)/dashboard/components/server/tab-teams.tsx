import TooltipCustom from '@/app/components/client/tooltip-custom'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { RiTeamFill } from 'react-icons/ri'
import { CgInfo } from 'react-icons/cg'

const TabTeams = () => {
  return (
    <section className="border h-full p-4">
      <article className="h-full w-full row-span-6">
        <Table>
          <TableCaption>Equipos inscritos en este torneo</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Numero</TableHead>
              <TableHead className='w-[250px]'>Nombre</TableHead>
              <TableHead>PJ</TableHead>
              <TableHead>Cantidad jugadores</TableHead>
              <TableHead>Pago inscripción</TableHead>
              <TableHead className="w-[100px]">Jugadores</TableHead>
              <TableHead className="w-[100px]">Información</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
            <TableCell className="font-medium">1</TableCell>
              <TableCell className="font-medium">Dorado</TableCell>
              <TableCell className="font-medium">10</TableCell>
              <TableCell className="font-medium">15</TableCell>
              <TableCell className="font-medium">$ 500000</TableCell>
              <TableCell className="font-medium text-center">
                <TooltipCustom text='Ver jugadores'>
                <Button size="icon" className='bg-blue-400'>
                  <RiTeamFill />
                </Button>
                </TooltipCustom>
              </TableCell>
              <TableCell className="font-medium text-center">
                <TooltipCustom text='Ver equipo'>
                <Button size="icon" className='bg-yellow-400'>
                <CgInfo />
                </Button>
                </TooltipCustom>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </article>
    </section>
  )
}

export default TabTeams
