export const INIT_FORM_DATA = {
  nameTournament: '',
  valueTournament: 0,
  description: '',
  category: '',
  gender: '',
  variant: '',
  contactName: '',
  contactNumber: ''
}

export const INIT_USER_DATA = {
  nameUser: '',
  emailUser: '',
  dateBirth: new Date(),
  phoneNumber: '',
  gender: '',
  rol: '',
  numberIdentity: '',
  position: ''
}

export const INIT_TEAM_DATA = {
  name: '',
  firstColor: '',
  secondColor: '',
  image: ''
}

export const COLORS_TEAM = [
  { name: 'rojo', color: '#FF0000' },
  { name: 'azul', color: '#0000FF' },
  { name: 'verde', color: '#008000' },
  { name: 'amarillo', color: '#FFFF00' },
  { name: 'morado', color: '#800080' },
  { name: 'naranja', color: '#FFA500' },
  { name: 'negro', color: '#000000' },
  { name: 'blanco', color: '#FFFFFF' }
] as Array<{ name: string, color: string }>
