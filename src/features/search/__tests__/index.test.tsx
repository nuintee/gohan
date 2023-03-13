import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Index from '@/pages/index'
import '@testing-library/jest-dom'
import { wrapper } from '@/config/jest/wrapper'
import useToast from '@/libs/react-toastify'

jest.mock('next/router', () => require('next-router-mock'))
const errorToast = jest.spyOn(useToast, 'error')

beforeAll(() => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
    clearWatch: jest.fn(),
  }

  mockGeolocation.getCurrentPosition.mockImplementation(
    (successCallback, errorCallback, options) => {
      errorCallback({
        code: 1,
        message: 'User denied Geolocation',
      })
    },
  )

  mockGeolocation.watchPosition.mockImplementation((successCallback, errorCallback, options) => {
    errorCallback({
      code: 1,
      message: 'User denied Geolocation',
    })
  })

  // @ts-ignore
  global.navigator.geolocation = mockGeolocation
})

describe('/<index>', () => {
  it('renders a error toast', async () => {
    render(<Index />, { wrapper })

    const button = screen.getByTestId('gohan__button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(errorToast).toBeCalledWith('Please allow user geolocaiton tracking')
    })
  })
})
