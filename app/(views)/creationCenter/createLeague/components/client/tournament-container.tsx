import { Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import AwardTournament from '../../../components/award-tournament'
import { type Category } from '@/app/types/category'
import { type Gender } from '@/app/types/gender'
import { type SubCategory } from '@/app/types/sub-category'
import { type Award } from '@/app/types/award'

interface Props {
  setFormData: (value: any) => void
  formData: any
  category: Category[]
  gender: Gender[]
  award: Award[]
  setAward: (value: any) => void
  subCategory: SubCategory[]
}

const TournamentContainer = ({
  setFormData,
  formData,
  category,
  gender,
  award,
  setAward,
  subCategory
}: Props) => {
  return (
    <div className="gridFormat">
      <div className="flex flex-col gap-2">
        <Input
          isRequired
          type="text"
          variant="bordered"
          label="Nombre de torneo"
          value={formData.nameTournament}
          onChange={(event) => {
            setFormData({
              ...formData,
              nameTournament: event.target.value
            })
          }}
        />
        <Input
          type="number"
          label="Valor del torneo"
          value={formData.valueTournament}
          placeholder="0.00"
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
          onChange={(event) => {
            setFormData({
              ...formData,
              valueTournament: Number(event.target.value)
            })
          }}
        />
        <Textarea
          label="Description"
          value={formData.description}
          variant="bordered"
          placeholder="Estos datos se mostraran en la descripción del torneo, habla de los mas importante"
          className="max-w-full"
          onChange={(event) => {
            setFormData({
              ...formData,
              description: event.target.value
            })
          }}
        />
        <Select
          label="Seleccione la categoría"
          className="max-w-full"
          defaultSelectedKeys={
            formData.category === ''
              ? ['Infantil']
              : [`${formData.category}`]
          }
          isRequired
          onChange={(event) => {
            setFormData({
              ...formData,
              category: event.target.value
            })
          }}
        >
          {category !== null
            ? (
                category.map(({ name }) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
                ))
              )
            : (
            <Select>
              <span>Sin datos</span>
            </Select>
              )}
        </Select>
        <Select
          label="Seleccione el genero"
          className="max-w-full"
          isRequired
          defaultSelectedKeys={
            formData.gender === '' ? ['Masculino'] : [`${formData.gender}`]
          }
          onChange={(event) => {
            setFormData({
              ...formData,
              gender: event.target.value
            })
          }}
        >
          {gender !== null
            ? (
                gender.map(({ name }) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
                ))
              )
            : (
            <Select>
              <span>Sin datos</span>
            </Select>
              )}
        </Select>
        <Select
          label="Seleccione una sub categoría"
          className="max-w-full"
          defaultSelectedKeys={
            formData.variant === ''
              ? ['Futbol 5']
              : [`${formData.variant}`]
          }
          isRequired
          onChange={(event) => {
            setFormData({
              ...formData,
              variant: event.target.value
            })
          }}
        >
          {subCategory !== null
            ? (
                subCategory.map(({ name }) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
                ))
              )
            : (
            <Select>
              <span>Sin datos</span>
            </Select>
              )}
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <AwardTournament
          award={award}
          setAward={setAward}
          idTournament={null}
        />
        <Input
          isRequired
          type="text"
          variant="bordered"
          value={formData.contactName}
          label="Nombre de contacto"
          onChange={(event) => {
            setFormData({
              ...formData,
              contactName: event.target.value
            })
          }}
        />
        <Input
          isRequired
          type="tel"
          variant="bordered"
          value={formData.contactNumber}
          label="Numero de teléfono de contacto"
          onChange={(event) => {
            setFormData({
              ...formData,
              contactNumber: event.target.value
            })
          }}
        />
      </div>
    </div>
  )
}

export default TournamentContainer
