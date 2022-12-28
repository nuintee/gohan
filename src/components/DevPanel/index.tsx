import { useGeoLocation, useToast } from '@/hooks/context'
import { Copy } from '@/icons'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useState, useEffect, useRef } from 'react'
import useDirections from '../MapBox/hooks/Directions'
import { Regular as Button } from '@/components/Button'
import copy from '@/utils/copy'
import { IndicatorProps } from './types'
import { Label, SwitchButton, Section, Indicator } from './components'

const DevPanel = (props) => {
  const { useragent } = props
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  const { flyTo, geoState, setIsMapClickable, isMapClickable, setGeoState } = useGeoLocation()
  const { isLocationReady } = useDirections()

  const DEFAULT_COORDS = useRef(null as any)
  const [isCoordsMoved, setIsCoordsMoved] = useState(false)

  useEffect(() => {
    if (!geoState.lat || !geoState.lng) return

    if (!DEFAULT_COORDS.current?.IS_FIXED) {
      DEFAULT_COORDS.current = { ...geoState, IS_FIXED: true }
    } else {
      const sameLat = DEFAULT_COORDS.current?.lat === geoState?.lat
      const sameLng = DEFAULT_COORDS.current?.lng === geoState?.lng
      const IS_MOVED = !sameLat || !sameLng
      setIsCoordsMoved(IS_MOVED)
    }
  }, [geoState])

  const setCoordsToDefault = () => {
    console.dir(DEFAULT_COORDS.current)
    setGeoState(DEFAULT_COORDS.current)
  }

  const authHandle = () => {
    if (session) {
      signOut()
    } else {
      signIn()
    }
  }

  if (process.env.NODE_ENV !== 'development') return <></>

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className='z-[100] bg-gh-dark py-2 px-4 rounded-md text-white outline-none active:scale-90'
      >
        DevTools
      </button>
    )

  return (
    <div className='z-[100] absolute left-0 top-0 bg-white h-screen min-w-[20rem]'>
      <header className='flex items-center justify-between gap-4 p-4'>
        <p className='font-bold whitespace-nowrap'>Dev Tools</p>
        <Button text='Close' onClick={() => setIsOpen(false)} />
      </header>
      <hr></hr>
      <main className='flex flex-col gap-4 p-4'>
        <Section label='Actions'>
          <Button text='Go random' loading={!isLocationReady} onClick={flyTo} />
        </Section>

        <Section label='IPs'>
          <Indicator label='IP' value={useragent?.ip} allowCopy />
        </Section>

        <Section
          label='Coords'
          value={`${geoState.lat}, ${geoState.lng}`}
          allowCopy
          allowReset
          disabledReset={!isCoordsMoved}
          onReset={setCoordsToDefault}
        >
          {Object.keys(geoState)
            .filter((v) => !['error', 'IS_FIXED'].includes(v))
            .map((v, index) => (
              <Indicator
                label={v}
                supportText={DEFAULT_COORDS.current && DEFAULT_COORDS.current[v]}
                value={geoState[v]}
                allowCopy
              />
            ))}
        </Section>

        <Section label='Map Control'>
          <Label spacing='justify-between' text='Move on click'>
            <SwitchButton
              defaultValue={isMapClickable}
              onChange={(bool) => setIsMapClickable(bool)}
            />
          </Label>
          <Label spacing='justify-between' text='Set Zoom'>
            <input
              type={'number'}
              min={0}
              max={100}
              onChange={(e) => setGeoState((prev) => ({ ...prev, zoom: e.target.value }))}
              defaultValue={geoState?.zoom}
            />
          </Label>
        </Section>
      </main>
    </div>
  )
}

export default DevPanel
