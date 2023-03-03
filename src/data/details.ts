import { PERIODS } from './_openingHours'
import _places from './_places.json'

export const details = {
  html_attributions: [],
  result: (place_id: string) => {
    const res = _places.results.find((place) => place.place_id === place_id)
    return {
      ...res,
      current_opening_hours: {
        ...res?.opening_hours,
        periods: res?.opening_hours.periods?.map((p, i) => ({
          open: { ...p.open, date: PERIODS[i].open?.date },
          close: { ...p.close, date: PERIODS[i].close?.date },
        })),
      },
    }
  },
  status: 'OK',
}
