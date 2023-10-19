export async function GET () {
  console.log('entro')
  const data = await fetch('https://run.mocky.io/v3/fe7ca563-db5c-42fd-8103-d7c404a86211')
  if (!data.ok) {
    throw new Error('Error en la petición')
  }
  return data
}
