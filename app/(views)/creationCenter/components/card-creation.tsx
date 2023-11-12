import { Button } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
  urlImage: string
  title: string
  path: string
  height?: number
  width?: number
  isThereButton: boolean
}

const CardCreation = ({
  title,
  urlImage,
  path = '/',
  height = 430,
  width = 430,
  isThereButton
}: Props) => {
  const route = useRouter()
  return (
    <div className="relative">
      <Image
        alt="image of soccer"
        height={height}
        src={urlImage}
        width={width}
        className="h-full"
      />
      <article className="articleButton">
        {isThereButton
          ? (
          <Button
            className="text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="md"
            onClick={() => {
              route.push(path)
            }}
          >
            {title}
          </Button>
            )
          : (
          <span className="text-white text-xl ml-4">{title}</span>
            )}
      </article>
    </div>
  )
}

export default CardCreation
