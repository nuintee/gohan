import { Ref, RefAttributes } from 'react'
import { MapRef, ViewState } from 'react-map-gl'
import { atom } from 'recoil'

export type DefaultMapboxValues = {
  mapBoxRef: RefAttributes<MapRef>
  focusedPlaceId: string // place_id
}

export const mapBoxState = atom<DefaultMapboxValues>({
  key: 'directionsState',
  default: {
    mapBoxRef: {},
    focusedPlaceId: '',
  },
})
