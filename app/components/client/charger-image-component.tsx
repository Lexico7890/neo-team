import { Button } from '@nextui-org/react'
import { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'

interface Props {
  handleChargeImage: (image: File, extension: string) => void
  imageProp: string
}

const ChargerImageComponent = ({ handleChargeImage, imageProp }: Props) => {
  const [image, setImage] = useState<string>(imageProp)
  const [loading, setLoading] = useState<boolean>(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const file: File = (target.files as FileList)[0]
    if (file instanceof File) {
      const fileName = file.name
      const fileExtension = fileName.slice(
        ((fileName.lastIndexOf('.') - 1) >>> 0) + 2
      )
      handleChargeImage(file, fileExtension)
      setImage(URL.createObjectURL(file as any))
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const selectedImage: File = event.dataTransfer.files?.[0]
    if (selectedImage !== undefined) {
      const reader = new FileReader()
      reader.onload = () => {
        if (selectedImage instanceof File) {
          const fileName = selectedImage.name
          const fileExtension = fileName.slice(
            ((fileName.lastIndexOf('.') - 1) >>> 0) + 2
          )
          handleChargeImage(selectedImage, fileExtension)
          setImage(URL.createObjectURL(selectedImage as any))
        }
      }
      reader.readAsDataURL(selectedImage)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleImageLoad = () => {
    setLoading(false)
    console.log('CARGANDO')
  }

  const handleDeleteImage = () => {
    setImage('')
  }
  return (
    <div className="image-uploader">
      {image.length > 0
        ? (
        <>
          <div className="absolute top-0 left-0">
            <Button isIconOnly color="danger" variant="light" onClick={handleDeleteImage}>
              <AiFillDelete />
            </Button>
          </div>
          <img
            src={image}
            alt="Uploaded"
            onLoad={handleImageLoad}
            className={`uploaded-image ${loading ? 'loading' : ''}`}
          />
        </>
          )
        : (
        <>
          <div className="h-full justify-evenly flex flex-col">
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="file-input"
            />
            <label
              htmlFor="file"
              className="z-20 mx-auto bottom-8 b left-0 right-0 h-8 w-48 flex justify-center items-center border-1 border cursor-pointer hover:bg-slate-200"
            >
              Cargar imagen de liga
            </label>
            <span className="flex justify-center items-center">Ó</span>
            <p>Arrastra la imagen seleccionada aquí</p>
          </div>
          <div
            className="drop-zone"
            onDrop={(e) => {
              handleDrop(e)
            }}
            onDragOver={handleDragOver}
          ></div>
        </>
          )}
    </div>
  )
}

export default ChargerImageComponent
