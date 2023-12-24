import { type Output, maxLength, minLength, minValue, number, object, string } from 'valibot'

export const TournamentSchema = object({
  nameTournament: string('Debe agregar un nombre al torneo', [
    minLength(3, 'El nombre del torneo debe contener al menos 3 caracteres'),
    maxLength(50, 'El nombre del torneo debe contener menos de 50 caracteres')
  ]),
  valueTournament: number('Debe agregar un valor de inscripción al torneo', [
    minValue(1, 'El valor debe ser mayor a 0')
  ]),
  description: string('Debe agregar una descripción al torneo', [
    minLength(10, 'La descripción debe contener al menos 10 caracteres'),
    maxLength(500, 'El nombre debe contener menos de 50 caracteres')
  ]),
  category: string('Debe seleccionar una categoría', [
    minLength(3, 'Debe seleccionar una categoría')
  ]),
  gender: string('Debe seleccionar un genero', [
    minLength(3, 'Debe seleccionar un genero')
  ]),
  subCategory: string('Debe seleccionar una sub categoría', [
    minLength(3, 'Debe seleccionar una sub categoría')
  ]),
  contactName: string('Debe agregar un nombre al contacto', [
    minLength(3, 'El nombre del contacto debe contener al menos 3 caracteres'),
    maxLength(
      50,
      'El nombre del contacto debe contener menos de 50 caracteres'
    )
  ]),
  contactNumber: string('Debe agregar un numero de contacto', [
    minLength(7, 'Numero de contacto invalido'),
    maxLength(10, 'Numero de contacto invalido')
  ])
})

export type TournamentData = Output<typeof TournamentSchema>
