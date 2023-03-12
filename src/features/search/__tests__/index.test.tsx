import { fireEvent, render, screen } from '@testing-library/react'
import Index from '@/pages/index'
import '@testing-library/jest-dom'
import useToast from '@/libs/react-toastify'

const successToast = jest.spyOn(useToast, 'success')
const errorToast = jest.spyOn(useToast, 'error')

describe('_Home', () => {
  it('renders a success toast', () => {
    render(<Index />)

    const button = screen.getByTestId('success_modal_btn')
    fireEvent.click(button)

    expect(successToast).toBeCalled()
  })
  it('renders a error toast', () => {
    render(<Index />)

    const button = screen.getByTestId('error_modal_btn')
    fireEvent.click(button)

    expect(errorToast).toBeCalled()
  })
})
