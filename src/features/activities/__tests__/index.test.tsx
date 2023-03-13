import '@testing-library/jest-dom'

// page
import LibraryPage from '@/pages/library'
import { render } from '@testing-library/react'
import { setUpWrapper } from '@/config/jest/wrapper'

const authedWrapper = setUpWrapper({ isAuthed: true })
const unauthedWrapper = setUpWrapper({ isAuthed: false })

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    }
  }

jest.mock('mapbox-gl/dist/mapbox-gl', () => {
  return {
    default: {
      accessToken: '',
      GeolocateControl: jest.fn(),
      Map: jest.fn(() => ({
        addControl: jest.fn(),
        on: jest.fn(),
        remove: jest.fn(),
        fitBounds: jest.fn(),
      })),
      NavigationControl: jest.fn(),
    },
  }
})

describe('/library', () => {
  it('13bff: renders Library page without Error when authed', () => {
    const page = render(<LibraryPage />, { wrapper: authedWrapper })
    const viewport = page.getByTestId('library__page')
    expect(viewport).toBeInTheDocument()
  })

  it('e6eb4: renders Auth Fallback when not authed', () => {
    const page = render(<LibraryPage />, { wrapper: unauthedWrapper })

    const viewport = page.getByTestId('auth__fallback')
    expect(viewport).toBeInTheDocument()
  })
})
