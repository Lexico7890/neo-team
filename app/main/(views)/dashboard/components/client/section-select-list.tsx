'use client'

import SelectCustomize from '@/app/components/client/select-customize'
import useInstanceSupabaseClient from '@/app/hooks/useInstanceSupabaseClient'
import { type TournamentDatabase } from '@/app/types/tournamentDatabase'
import { SelectItem } from '@/components/ui/select'

interface Props {
  handleSelectGender: (value: string) => void
  handleSelectCategory: (value: string) => void
  handleSelectSubCategory: (value: string) => void
  dataTournament?: TournamentDatabase
}

const SectionSelectList = ({ dataTournament, handleSelectCategory, handleSelectGender, handleSelectSubCategory }: Props) => {
  const { category, gender, subCategory } = useInstanceSupabaseClient()
  return (
    <>
      <SelectCustomize
        label="Genero"
        placeholder="Seleccione un genero"
        handleSelectOption={handleSelectGender}
        defaultValue={dataTournament?.gender}
      >
        {gender.map(({ name, id }) => (
          <SelectItem value={id} key={id}>
            {name}
          </SelectItem>
        ))}
      </SelectCustomize>
      <SelectCustomize
        label="Categoría"
        placeholder="Seleccione una categoría"
        handleSelectOption={handleSelectCategory}
        defaultValue={dataTournament?.category}
      >
        {category.map(({ name, id }) => (
          <SelectItem value={id} key={id}>
            {name}
          </SelectItem>
        ))}
      </SelectCustomize>
      <SelectCustomize
        handleSelectOption={handleSelectSubCategory}
        label="Sub-Categoría"
        placeholder="Seleccione una sub-categoría"
        defaultValue={dataTournament?.sub_category}
      >
        {subCategory.map(({ name, id }) => (
          <SelectItem value={id.toString()} key={id}>
            {name}
          </SelectItem>
        ))}
      </SelectCustomize>
    </>
  )
}

export default SectionSelectList
