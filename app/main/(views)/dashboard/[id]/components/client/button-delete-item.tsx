'use client'

import { Button } from '@/components/ui/button'
import { AiFillDelete } from 'react-icons/ai'

interface Props {
  handleMouseDown: () => void
  handleMouseUpCapture: () => void
  handleMouseLeave: () => void
  setKeepDelete: (value: boolean) => void
}

const ButtonDeleteItem = ({ handleMouseDown, handleMouseLeave, handleMouseUpCapture, setKeepDelete }: Props) => {
  return (
    <Button
      size="sm"
      variant="destructive"
      onMouseUpCapture={handleMouseUpCapture}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
    >
      <AiFillDelete />
    </Button>
  )
}

export default ButtonDeleteItem
