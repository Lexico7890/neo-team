'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const useChargeImageSupabase = () => {
  const supabase = createClientComponentClient()
  const chargeImageSupabase = async (imageLeague: File | undefined, extensionImage: string | undefined, path: string): Promise<string> => {
    let urlImage: string = ''
    if (imageLeague !== undefined) {
      const { data, error } = await supabase.storage
        .from(`image_neo_team/${path}`)
        .upload(
          `image_${Date.now().toString()}.${extensionImage}`,
          imageLeague
        )
      if (error !== null) {
        throw new Error('No se pudo cargar la imagen ', error)
      }
      const { data: url } = supabase.storage
        .from(`image_neo_team/${path}`)
        .getPublicUrl(data.path)
      urlImage = url.publicUrl
    } else {
      if (process.env.IMAGE_APP !== undefined) {
        urlImage = process.env.IMAGE_APP
      }
    }
    return urlImage
  }
  return { chargeImageSupabase }
}

export default useChargeImageSupabase
