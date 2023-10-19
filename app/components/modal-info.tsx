'use client'

import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react'

interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onOpen: () => void
}

export default function ModalInfo ({ isOpen, onOpen, onOpenChange }: Props) {
  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20'
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Información general del torneo
              </ModalHeader>
              <ModalBody>
                <h3>Precios</h3>
                <p>Inscripción: $700.000</p>
                <h3>¿Donde se juega?</h3>
                <p>Cancha 1, cancha2, cancha 3</p>
                <h3>Descripción general</h3>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
                <h3>Premios</h3>
                <p>Campeón: $2.500.000</p>
                <p>Contacto: 3027777777</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Entendido
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
