import { object, string, minLength, maxLength, email, type Output, number, minValue, maxValue } from 'valibot'

export const UserSchema = object({
  nameUser: string('Nombre de usuario obligatorio', [
    minLength(3, 'Nombre de usuario debe tener mas de 2 caracteres'),
    maxLength(50, 'Nombre de usuario no debe superar 50 caracteres')
  ]),
  emailUser: string('Campo email es obligatorio.', [
    minLength(1, 'Por favor ingrese un correo valido'),
    email('La dirección de correo electrónico no tiene un formato valido')
  ]),
  dateBirth: string('Campo fecha de nacimiento obligatorio'),
  phoneNumber: string('Campo telefono obligatorio', [
    minLength(7, 'Numero de contacto invalido'),
    maxLength(10, 'Numero de contacto invalido')
  ]),
  gender: string('Campo genero obligatorio'),
  rol: string('Campo rol obligatorio'),
  numberIdentity: number('Numero de identificación requerido', [
    minValue(5, 'Numero de identificación invalido'),
    maxValue(10, 'Numero de identificación invalido')
  ])
})

export type UserData = Output<typeof UserSchema>
