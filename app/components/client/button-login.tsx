import { Button } from '@/components/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FaGoogle } from 'react-icons/fa'

const ButtonLogin = () => {
  const supabase = createClientComponentClient()
  const handleLoginGoogle = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/api/login'
      }
    })
    if (error !== null) {
      throw new Error('No se pudo completar el ingreso')
    }
  }
  return (
    <Button
      variant="outline"
      onClick={handleLoginGoogle}
      className="flex gap-2 hover:bg-[#4285F4]"
    >
      <span>continuar con google </span>
      <FaGoogle />
    </Button>
  )
}

export default ButtonLogin
