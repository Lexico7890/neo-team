'use client'

import { Button } from '@/components/ui/button'
import { AiFillDelete } from 'react-icons/ai'

interface Props {
  handleClick: () => void
}

const ButtonDeleteItem = ({ handleClick }: Props) => {
  return (
    <Button size='sm' variant='destructive' onClick={handleClick}>
      <AiFillDelete />
    </Button>
  )
}

export default ButtonDeleteItem
