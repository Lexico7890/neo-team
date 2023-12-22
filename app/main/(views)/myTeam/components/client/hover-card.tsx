import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { COLORS_TEAM } from '@/app/data/constant'

interface Props {
  handleChangeColor: (color: string, isFirst: boolean) => void
  isFirst: boolean
  name: string
}

const HoverCardColors = ({ handleChangeColor, name, isFirst }: Props) => {
  const handleColor = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, color: string) => {
    event.preventDefault()
    handleChangeColor(color, isFirst)
  }
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="link" className='w-full' onClick={(event) => { event.preventDefault() }}>{name}</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-wrap">
          {COLORS_TEAM.map(({ color, name }) => (
            <Button
              onClick={(event) => { handleColor(event, color) }}
              key={name}
              style={{
                backgroundColor: `${color}`,
                height: '50px',
                width: '50px',
                border: '1px solid white'
              }}
              className='hover:opacity-50'
            ></Button>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default HoverCardColors
