import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface Props {
  children: React.ReactNode
  label: string
  placeholder: string
  handleSelectOption: (value: string) => void
}

const SelectCustomize = ({ children, label, placeholder, handleSelectOption }: Props) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={label}>{label}</Label>
      <Select onValueChange={(event) => { handleSelectOption(event) }}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {children}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectCustomize
