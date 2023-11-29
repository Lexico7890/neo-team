'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  type: string
  name: string
  placeholder: string
}

const InputCustomize = ({ type, name, placeholder }: Props) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={type}>{name}</Label>
      <Input type={type} id={type} placeholder={placeholder} />
    </div>
  )
}

export default InputCustomize
