import { Ref, RefAttributes, RefObject, useRef } from 'react'
import { MapRef, ViewState } from 'react-map-gl'
import { atom } from 'recoil'

export type DefaultMapboxValues = {
  mapBoxRef: RefObject<MapRef>
  focusedPlaceId: string // place_id
}

export const mapBoxState = atom<DefaultMapboxValues>({
  key: 'directionsState',
  default: {
    mapBoxRef: {
      current: null,
    },
    focusedPlaceId: '',
  },
})
