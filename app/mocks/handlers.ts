// src/mocks/handlers.js
import { http } from 'msw'

const mockData = [
  {
    id: '16995266-2a3d-4e47-a789-5a5578777937',
    created_at: '2024-01-07T00:59:59.932281+00:00',
    name: 'bbbbbbbb',
    createdBy: '46ef3b4f-54f5-4dc7-b8f6-ab6b674d1a93',
    url_image: 'https://eprmauzzggwoeydncjpq.supabase.co/storage/v1/object/public/image_neo_team/imageLeague/image_1704728634574.png'
  }
  // Agrega más datos según sea necesario para tu prueba
]

export const handlers = [
  http.get('/api/leagues', (req, res, ctx) => {
    return res(ctx.json(mockData))
  })
]
