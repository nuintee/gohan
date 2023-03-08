import { PERIODS } from './_openingHours'
import _places from './_places.json'

export const details = {
  html_attributions: [],
  result: (place_id: string) => {
    const res = _places.results.find((place) => place.place_id === place_id)

    const currentOpeningHours = res && {
      current_opening_hours: {
        ...res?.opening_hours,
        periods: PERIODS,
      },
    }

    return {
      ...res,
      ...currentOpeningHours,
    }
  },
  status: 'OK',
}
