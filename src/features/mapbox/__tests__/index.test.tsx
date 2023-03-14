import '@testing-library/jest-dom'

import useToast from '@/libs/react-toastify'
import MapBox from '../components/MapBox'
import { render } from '@testing-library/react'
import { wrapper } from '@/config/jest/wrapper'
const mockedErrorToast = jest.spyOn(useToast, 'error')

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
})

describe('<Mapbox />', () => {
  it('ea576: show error toast on Mapbox error except "TIMEOUT"', () => {
    const page = render(<MapBox />, { wrapper })
    page.debug()
    expect(mockedErrorToast).toBeCalled()
  })
})
