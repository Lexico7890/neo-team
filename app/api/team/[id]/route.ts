import { type NextRequest } from 'next/server'

export async function POST (req: NextRequest) {
  const requestURL = new URL(req.url)
  const id = requestURL.searchParams.get('id')
  console.log('id ', id)
}
