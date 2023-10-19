import { type NextRequest } from 'next/server'

export async function GET (req: NextRequest) {
  const requestURL = new URL(req.url)
  const id = requestURL.pathname.split('/')[3]
  const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  if (!data.ok) {
    throw new Error('Error en la peticion')
  }
  const result = await data.json()
  console.log(result)
  return data
}
