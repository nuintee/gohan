import { fireEvent, render, screen } from '@testing-library/react'
import Index from '@/pages/index'
import '@testing-library/jest-dom'
import { wrapper } from '@/config/jest/wrapper'

// const successToast = jest.spyOn(useToast, 'success')
// const errorToast = jest.spyOn(useToast, 'error')

beforeAll(() => {})

describe('_Home', () => {
  it('renders a success toast', () => {
    render(<Index />, { wrapper })

    const button = screen.getByRole('button')
    fireEvent.click(button)
  })
})
