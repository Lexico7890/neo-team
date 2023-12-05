import {
  object,
  string,
  minLength,
  maxLength,
  email,
  type Output,
  any,
  date,
  nullable
} from 'valibot'

// Función para definir los campos comunes
function defineCommonFields () {
  return {
    avatar_url: any(),
    nameUser: string('Nombre de usuario obligatorio', [
      minLength(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
      maxLength(50, 'El nombre de usuario no debe superar los 50 caracteres')
    ]),
    emailUser: string('El campo de correo electrónico es obligatorio', [
      minLength(1, 'Por favor ingrese un correo válido'),
      email('La dirección de correo electrónico no tiene un formato válido')
    ]),
    dateBirth: date('Campo de fecha de nacimiento obligatorio'),
    rol: string('Campo rol es obligatorio', [
      minLength(1, 'Campo rol es obligatorio')
    ]),
    gender: string('Campo de género obligatorio', [
      minLength(1, 'Campo genero es obligatorio')
    ]),
    phoneNumber: string('Campo de teléfono obligatorio', [
      minLength(7, 'Número de contacto inválido'),
      maxLength(10, 'Número de contacto inválido')
    ]),
    numberIdentity: string('Número de identificación requerido', [
      minLength(5, 'Número de identificación inválido'),
      maxLength(10, 'Número de identificación inválido')
    ])
  }
}

// Definir esquema de jugador
export const UserSchemaPlayer = object({
  ...defineCommonFields(),
  position: string('Campo de posición es obligatorio', [
    minLength(1, 'Campo de posición es obligatorio')
  ])
})

// Definir esquema de árbitro
export const UserSchemaReferee = object({
  ...defineCommonFields(),
  position: nullable(string())
})

// Tipos de datos de jugador y árbitro
export type UserDataPlayer = Output<typeof UserSchemaPlayer>
export type UserDataReferee = Output<typeof UserSchemaReferee>
