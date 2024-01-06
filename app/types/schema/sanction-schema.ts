import { type Output, maxLength, minLength, minValue, number, object, string } from 'valibot'

export const SanctionSchema = object({
  name: string('Debe agregar un nombre a la premiación', [
    minLength(3, 'El nombre de la liga debe contener al menos 3 caracteres'),
    maxLength(30, 'El nombre de la liga debe contener menos de 31 caracteres')
  ]),
  description: string('Debe agregar una descripción sobre la sanción.', [
    minLength(3, 'La descripción debe contener mínimo 3 caracteres.'),
    maxLength(50, 'La descripción no debe superar los 50 caracteres.')
  ]),
  value: number('Debe agregar un valor a la premiación', [
    minValue(1, 'El valor debe ser mayor a 0')
  ])
})

export type SanctionData = Output<typeof SanctionSchema>
