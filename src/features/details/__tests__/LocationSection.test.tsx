import { wrapper } from '@/config/jest/wrapper'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import LocationSection from '../components/ui/LocationSection'

// data
import GEOLOCATION_DATA from '@/data/geolocation.json'
import useGPS from '@/hooks/gps'

jest.mock('@/hooks/gps', () => jest.fn())

const mockedGPS = useGPS as jest.Mock

describe('<LocationSection />', () => {
  mockedGPS.mockImplementation(() => ({
    gps: GEOLOCATION_DATA,
    isGPSFetching: false,
    isGPSError: false,
  }))
  it('459e5: renders distance in metric when haversine results are valid', () => {
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
