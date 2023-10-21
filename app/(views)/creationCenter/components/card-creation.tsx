import { Button, Card, CardFooter } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
  urlImage: string
  title: string
  path: string | null
  isThereButton: boolean
  height?: number
  width?: number
}

const CardCreation = ({
  title,
  urlImage,
  path,
  isThereButton,
  height = 530,
  width = 530
}: Props) => {
  const route = useRouter()
  return (
    <div className="relative mb-10">
      <Card isFooterBlurred radius="lg" className='max-w-[450px]'>
        <Image
          alt="image of soccer"
          className="object-cover"
          height={height}
          src={urlImage}
          width={width}
        />
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-lg text-white/80">{title}</p>
          {isThereButton && (
            <Button
              className="text-tiny text-white bg-black/20"
              variant="flat"
              color="default"
              radius="lg"
              size="md"
              onClick={() => {
                route.push(`${path}`)
              }}
            >
              Iniciar
            </Button>
          )}
        </CardFooter>
      </Card>
      <div className="customShadow"></div>
    </div>
  )
}

export default CardCreation
