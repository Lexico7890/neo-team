import { render, screen } from '@testing-library/react'
import LeagueList from '../league-list'

describe('LeagueList component', () => {
  it('renders league cards with data', async () => {
    render(<LeagueList />)

    const leagueCards = await screen.findAllByTestId('league-card')

    expect(leagueCards).toHaveLength(1) // Reemplaza con el número correcto de cartas esperadas
    expect(screen.getByText('bbbbbbbb')).toBeInTheDocument()
    // Agrega más expectativas según la información que se espera mostrar en los componentes
  })

  // Agrega más pruebas según sea necesario para cubrir distintos casos
})
