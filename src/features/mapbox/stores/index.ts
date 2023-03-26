import { MapRef } from 'react-map-gl'
import { atom } from 'recoil'

export type DefaultMapboxValues = {
  focusedPlaceId: string // place_id
}

export type DefaultMapboxRef = MapRef | null

export const mapBoxState = atom<DefaultMapboxValues>({
  key: 'mapBoxState',
  default: {
    focusedPlaceId: '',
  },
})

export const mapBoxRefAtom = atom<DefaultMapboxRef>({
  key: 'mapBoxRef',
  default: null,
  dangerouslyAllowMutability: true,
})
