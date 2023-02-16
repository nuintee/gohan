import { createRef, Ref, RefAttributes, RefObject, useRef } from 'react'
import { MapRef, ViewState } from 'react-map-gl'
import { atom } from 'recoil'

export type DefaultMapboxValues = {
  focusedPlaceId: string // place_id
}

export const mapBoxState = atom<DefaultMapboxValues>({
  key: 'mapBoxState',
  default: {
    focusedPlaceId: '',
  },
})

export const mapBoxRefAtom = atom({
  key: 'mapBoxRef',
  default: null,
  dangerouslyAllowMutability: true,
})
