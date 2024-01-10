import { render, screen } from '@testing-library/react'
import LeagueList from '../league-list'

describe('LeagueList component', () => {
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

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData)
    }) as jest.MockedFunction<typeof global.fetch>
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders league cards with data', async () => {
    // Renderiza el componente
    render(<LeagueList />)

    // Espera a que los datos sean cargados y se muestren en el componente
    const leagueCards = await screen.findAllByTestId('league-card')

    // Verifica que los elementos se renderizan correctamente
    expect(leagueCards).toHaveLength(mockData.length)
    expect(screen.getByText('bbbbbbbb')).toBeInTheDocument()
    // Agrega más expectativas según la información que se espera mostrar en los componentes
  })

  // Agrega más pruebas según sea necesario para cubrir distintos casos
})
