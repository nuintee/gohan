import { wrapper } from '@/config/jest/wrapper'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import LocationSection from '../components/ui/LocationSection'
import useGPS from '@/hooks/gps'

// data
import GEOLOCATION_DATA from '@/data/geolocation.json'
import calculateDistance from '@/libs/haversine-distance'
const GEOMETRY = {
  lat: 20,
  lng: 20,
}

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
            location: GEOMETRY,
            viewport: {
              northeast: GEOMETRY,
              southwest: GEOMETRY,
            },
          },
        }}
        isLoading={false}
        showFullMap={false}
        onMapClick={() => {}}
      />,
      { wrapper },
    )
    const distanceCalculation = calculateDistance(GEOLOCATION_DATA.coords, GEOMETRY)

    const distance = page.queryByTestId('distance__decoration')
    const distanceText = page.getByText(distanceCalculation.auto)
    expect(distance).toBeInTheDocument()
    expect(distanceText).toBeInTheDocument()
  })
  it('808da: not renders distance gps is valid', () => {
    mockedGPS.mockImplementation(() => ({
      gps: {
        coords: {},
      },
      isGPSFetching: false,
      isGPSError: false,
    }))
    const page = render(
      <LocationSection
        data={{
          vicinity: 'TEST_VICINITY',
          geometry: {
            location: GEOMETRY,
            viewport: {
              northeast: GEOMETRY,
              southwest: GEOMETRY,
            },
          },
        }}
        isLoading={false}
        showFullMap={false}
        onMapClick={() => {}}
      />,
      { wrapper },
    )

    const distance = page.queryByTestId('distance__decoration')
    expect(distance).not.toBeInTheDocument()
  })
})
