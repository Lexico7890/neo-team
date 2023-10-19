'use client'

import { Button, Card, CardFooter } from '@nextui-org/react'
import Image from 'next/image'

const PageCreationCenter = () => {
  return (
    <section>
      <div className="w-full text-center sm:my-8 my-4">
        <span className="sm:text-4xl text-2xl font-bold">
          Centro de creación
        </span>
      </div>
      <div className="sm:p-6 p-2 md:flex gap-8">
        <div className="w-full flex justify-center ">
          <div className="relative mb-10">
            <Card isFooterBlurred radius="lg" className="">
              <Image
                alt="Woman listing to music"
                className="object-cover"
                height={530}
                src="/image/imageLeague.jpg"
                width={530}
              />
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">Crear liga</p>
                <Button
                  className="text-tiny text-white bg-black/20"
                  variant="flat"
                  color="default"
                  radius="lg"
                  size="md"
                >
                  Iniciar
                </Button>
              </CardFooter>
            </Card>
            <div className="customShadow"></div>
          </div>
        </div>
        <div className="w-full flex justify-center ">
          <div className="relative mb-10">
            <Card isFooterBlurred radius="lg" className="">
              <Image
                alt="Woman listing to music"
                className="object-cover"
                height={530}
                src="/image/imageLeague.jpg"
                width={530}
              />
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">Crear liga</p>
                <Button
                  className="text-tiny text-white bg-black/20"
                  variant="flat"
                  color="default"
                  radius="lg"
                  size="md"
                >
                  Iniciar
                </Button>
              </CardFooter>
            </Card>
            <div className="customShadow"></div>
          </div>
        </div>
        <div className="w-full flex justify-center ">
          <div className="relative mb-10">
            <Card isFooterBlurred radius="lg" className="">
              <Image
                alt="Woman listing to music"
                className="object-cover"
                height={530}
                src="/image/imageLeague.jpg"
                width={530}
              />
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">Crear liga</p>
                <Button
                  className="text-tiny text-white bg-black/20"
                  variant="flat"
                  color="default"
                  radius="lg"
                  size="md"
                >
                  Iniciar
                </Button>
              </CardFooter>
            </Card>
            <div className="customShadow"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PageCreationCenter
