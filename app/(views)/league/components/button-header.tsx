'use client'

import ModalInfo from '@/app/components/modal-info'
import { Button, useDisclosure } from '@nextui-org/react'
import { GoInfo } from 'react-icons/go'
import { RiNumbersFill } from 'react-icons/ri'

const ButtonHeader = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <div className="inline-flex gap-4">
      <Button
        onPress={onOpen}
        size="md"
        isIconOnly
        color="secondary"
        aria-label="Like"
        onClick={() => {}}
        className='text-xl'
      >
        <GoInfo />
      </Button>
      <Button
        size="md"
        isIconOnly
        color="secondary"
        aria-label="Like"
        onClick={() => {}}
        className='text-xl'
      >
        <RiNumbersFill />
      </Button>
      <ModalInfo isOpen={isOpen} onOpenChange={onOpenChange} onOpen={onOpen} />
    </div>
  )
}

export default ButtonHeader
