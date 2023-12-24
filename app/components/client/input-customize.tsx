'use client'

import { Label } from '@/components/ui/label'

interface Props {
  type: string
  name: string
  children: React.ReactNode
}

const InputCustomize = ({ type, name, children }: Props) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={type}>{name}</Label>
      {children}
    </div>
  )
}

export default InputCustomize
