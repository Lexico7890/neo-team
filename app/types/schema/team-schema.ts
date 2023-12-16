import { type Output, maxLength, minLength, object, string } from 'valibot'

export const TeamSchema = object({
  name: string('el nombre del equipo es obligatorio', [
    minLength(3, 'El nombre debe contener como mínimo 3 letras'),
    maxLength(30, 'El nombre debe contener como máximo 30 letras')
  ]),
  firstColor: string('El color principal del equipo es obligatorio'),
  secondColor: string('El color secundario del equipo es obligatorio'),
  imageTeam: string()
})

export type TeamData = Output<typeof TeamSchema>
