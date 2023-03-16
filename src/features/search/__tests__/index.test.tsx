import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import SearchLayout from '../layouts/SearchLayout'
import '@testing-library/jest-dom'
import { wrapper } from '@/config/jest/wrapper'
import useToast from '@/libs/react-toastify'

// data
import GEOLOCATION from '@/data/geolocation.json'
import { _testActivity } from '@/data/activities'

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
}

// @ts-ignore
global.navigator.geolocation = mockGeolocation

jest.mock('next/router', () => require('next-router-mock'))
const errorToast = jest.spyOn(useToast, 'error')

describe('<SearchLayout />', () => {
  it('ec512: renders screen without error', async () => {
    const page = render(<SearchLayout />, { wrapper })

    expect(page.getByTestId('search__layout')).toBeInTheDocument()
  })

  it('55755: renders a error toast and auto closes, on invalid geolocation Gohan search', async () => {
    mockGeolocation.watchPosition.mockImplementation(
      (_successCallback, errorCallback, _options) => {
        errorCallback({
          code: 1,
          message: 'User denied Geolocation',
        })
      },
    )

    const spyOnClose = jest.fn()
    render(<SearchLayout onClose={spyOnClose} />, { wrapper })

    const button = screen.getByTestId('gohan__button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(errorToast).toBeCalledWith('Please allow user geolocaiton tracking')
      expect(spyOnClose).toHaveBeenCalled()

      spyOnClose.mockRestore()
    })
  })

  it('4089b: renders 現在地の取得に失敗, when geolocation is denied', async () => {
    mockGeolocation.getCurrentPosition.mockImplementation(
      (_successCallback, errorCallback, _options) => {
        errorCallback({
          code: 1,
          message: 'User denied Geolocation',
        })
      },
    )
    mockGeolocation.watchPosition.mockImplementation(
      (_successCallback, errorCallback, _options) => {
        errorCallback({
          code: 1,
          message: 'User denied Geolocation',
        })
      },
    )
    const page = render(<SearchLayout />, { wrapper })
    const invalid_text = await page.findByText('現在地の取得に失敗')
    expect(invalid_text).toBeInTheDocument()
  })

  it('ddc5e: renders 現在地を取得中です, when geolocation is being fetching', async () => {
    mockGeolocation.watchPosition.mockImplementation(
      (_successCallback, _errorCallback, _options) => {},
    )
    const page = render(<SearchLayout />, { wrapper })
    const invalid_text = await page.findByText('現在地を取得中')
    expect(invalid_text).toBeInTheDocument()
  })

  it('fb3da: renders 現在地取得済みです, when geolocation is being fetched successfully', async () => {
    mockGeolocation.watchPosition.mockImplementation(
      (_successCallback, _errorCallback, _options) => {
        _successCallback(GEOLOCATION)
      },
    )
    const page = render(<SearchLayout />, { wrapper })
    const invalid_text = await page.findByText('現在地取得済み')
    expect(invalid_text).toBeInTheDocument()
  })
})
