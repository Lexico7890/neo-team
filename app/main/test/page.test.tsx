import { render, screen } from '@testing-library/react'
import MainPage from '../page'
import '@testing-library/jest-dom'

// Mockear la llamada a la API para simular el comportamiento de éxito
jest.mock('../../components/server/league-list', () => {
  return jest.fn(() => <div data-testid="league-list">Mocked LeagueList</div>)
})

describe('MainPage component', () => {
  test('renders main menu text', () => {
    render(<MainPage />)
    const mainMenuText = screen.getByText('Menu principal')
    expect(mainMenuText).toBeInTheDocument()
  })

  test('renders LeagueList component', () => {
    render(<MainPage />)
    const leagueList = screen.getByTestId('league-list')
    expect(leagueList).toBeInTheDocument()
  })
})
