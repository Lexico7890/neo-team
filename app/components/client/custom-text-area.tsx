import { Label } from '@/components/ui/label'

interface Props {
  label: string
  children: React.ReactNode
  id: string
}

const CustomTextArea = ({ label, children, id }: Props) => {
  return (
    <div className="grid w-full gap-1.5 max-w-sm">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  )
}

export default CustomTextArea
