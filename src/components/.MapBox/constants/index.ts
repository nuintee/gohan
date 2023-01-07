import { MapBoxInit } from '../types'

const mapbox: MapBoxInit = {
  lng: null,
  lat: null,
  zoom: null,
  pitch: null,
  bearing: null,
  error: {
    is: false,
    message: '',
  },
}

const initialValues = {
  mapbox,
}

export default initialValues
