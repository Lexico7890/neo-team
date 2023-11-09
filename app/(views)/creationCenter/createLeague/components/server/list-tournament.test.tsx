import '@testing-library/jest-dom'
import ListTournament from './list-tournament'
import { render } from '@testing-library/react'
import { type Tournament } from '@/app/types/tournament'

describe('<ListTournament />', () => {
  const component = render(<ListTournament tournament={[]} />)
  test('render component ListTournament', () => {
    component.getByText('NOMBRE')
  })

  test('insert data in table', () => {
    const tournament: Tournament[] = [
      {
        id: '1',
        name: 'Tournament 1',
        value: 100,
        nombre_categoria: 'Category 1',
        nombre_genero: 'Gender 1',
        contact_name: 'Contact 1',
        contact_number: '1234567890',
        created_at: '2022-01-01',
        description: 'Description 1',
        league_id: '1'
      },
      {
        id: '2',
        name: 'Tournament 2',
        value: 200,
        nombre_categoria: 'Category 2',
        nombre_genero: 'Gender 2',
        contact_name: 'Contact 2',
        contact_number: '0987654321',
        created_at: '2022-01-01',
        description: 'Description 1',
        league_id: '1'
      }
    ]

    const wrapper = render(<ListTournament tournament={tournament} />)

    // Assert
    expect(wrapper.getByText('Tournament 2')).toBeInTheDocument()
    /* expect(wrapper.find(TableColumn)).toHaveLength(7)
    expect(wrapper.find(TableRow)).toHaveLength(2) */
  })
})
