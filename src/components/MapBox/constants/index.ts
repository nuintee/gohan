type MapBoxInit = {
  lng: number
  lat: number
  zoom?: number
  pitch?: number
  bearing?: number
}

const mapbox: MapBoxInit = {
  lng: 139.64232765917689,
  lat: 35.44474978224382,
  zoom: 17,
  pitch: 60,
  bearing: -60,
}

const initialValues = {
  mapbox,
}

export default initialValues
