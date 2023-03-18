import { wrapper } from '@/config/jest/wrapper'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import LocationSection from '../components/ui/LocationSection'

// data
import GEOLOCATION_DATA from '@/data/geolocation.json'

// mock useGPS
jest.mock('@/hooks/gps', () =>
  jest.fn().mockImplementation(() => ({
    // gps: GEOLOCATION_DATA,
    gps: {
      coords: {},
    },
    isGPSFetching: false,
    isGPSError: false,
  })),
)

describe('<LocationSection />', () => {
  it('459e5:', () => {
    const page = render(
      <LocationSection
        data={{
          vicinity: 'TEST_VICINITY',
          geometry: {
            location: {
              lat: 20,
              lng: 20,
            },
            viewport: {
              northeast: {
                lat: 20,
                lng: 20,
              },
              southwest: {
                lat: 20,
                lng: 20,
              },
            },
          },
        }}
        isLoading={false}
        showFullMap={false}
        onMapClick={() => {}}
      />,
      { wrapper },
    )

    page.debug()
  })
})
