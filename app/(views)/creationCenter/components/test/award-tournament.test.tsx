import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import AwardTournament from '../award-tournament'
import '@testing-library/jest-dom'

describe('<AwardTournament />', () => {
  const award: [{ name: string, value: number }] = [{ name: 'test 1', value: 1 }]

  const mockHandle = jest.fn()

  const component = render(<AwardTournament award={award} setAward={mockHandle}/>)

  test('click botton create league', () => {
    const button = component.getByText('Crear liga')
    fireEvent.click(button)
    expect(mockHandle).toHaveBeenCalled()
  })

  const inputName = component.getAllByLabelText('Nombre premiación')
  const inputValue = component.getAllByLabelText('Valor premio')
  const button = component.getByText('Agregar')

  test('renders content', () => {
    component.getByText('test 1')
  })

  test('insert value input name', () => {
    fireEvent.change(inputName[0], { target: { value: 'test 2' } })
    expect(inputName[0]).toHaveValue('test 2')
  })

  test('insert value input value', () => {
    fireEvent.change(inputValue[0], { target: { value: 2 } })
    expect(inputValue[0]).toHaveValue(2)
  })

  test('click add new item', () => {
    fireEvent.click(button)
  })

  test('Agregar un premio a la tabla', () => {
    // const mockSetAward = jest.fn()
    // const element = render(<AwardTournament award={award} setAward={mockSetAward} />)

    const nameInput = screen.getByLabelText('Nombre premiación')
    const valueInput = screen.getByLabelText('Valor premio')
    const addButton = screen.getByRole('button', { name: 'Agregar' })

    fireEvent.change(nameInput, { target: { value: 'Premio 1' } })
    fireEvent.change(valueInput, { target: { value: '100' } })
    fireEvent.click(addButton)

    /* const li = element.container.querySelector('td')
    console.log(prettyDOM(li as any))

    expect(mockSetAward).toHaveBeenCalled()
    expect(nameInput).toHaveValue('')
    expect(valueInput).toHaveValue('') */
  })
})
