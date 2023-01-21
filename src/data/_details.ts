import _places from './_places.json'

export const _details = {
  html_attributions: [],
  result: (place_id: string) => _places.results.find((place) => place.place_id === place_id),
  status: 'OK',
}
