import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { COLORS_TEAM } from '@/app/data/constant'

interface Props {
  setColor: (value: string) => void
  name: string
}

const HoverCardColors = ({ setColor, name }: Props) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="link" className='w-full'>{name}</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-wrap">
          {COLORS_TEAM.map(({ color, name }) => (
            <Button
              onClick={() => {
                setColor(color)
              }}
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
