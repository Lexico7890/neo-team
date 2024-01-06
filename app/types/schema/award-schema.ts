import {
  type Output,
  maxLength,
  minLength,
  minValue,
  number,
  object,
  string
} from 'valibot'

export const AwardSchema = object({
  nameAward: string('Debe agregar un nombre a la premiación', [
    minLength(3, 'El nombre de la liga debe contener al menos 3 caracteres'),
    maxLength(30, 'El nombre de la liga debe contener menos de 31 caracteres')
  ]),
  value: number('Debe agregar un valor a la premiación', [
    minValue(1, 'El valor debe ser mayor a 0')
  ])
})

export type AwardData = Output<typeof AwardSchema>
