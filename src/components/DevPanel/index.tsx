import { useGeoLocation, useToast } from '@/hooks/context'
import React, { useState, useEffect, useRef } from 'react'
import useDirections from '../MapBox/hooks/Directions'
import { Regular as Button } from '@/components/Button'
import { Label, SwitchButton, Section, Indicator } from './components'

const DevPanel = (props) => {
  const { useragent } = props
  const [isOpen, setIsOpen] = useState(false)
  const { flyTo, geoState, setIsMapClickable, isMapClickable, setGeoState } = useGeoLocation()
  const { isLocationReady } = useDirections()

  const DEFAULT_COORDS = useRef(null as any) // Must be global
  const [isCoordsMoved, setIsCoordsMoved] = useState(false)

  const setCoordsToDefault = () => {
    console.dir(DEFAULT_COORDS.current)
    setGeoState(DEFAULT_COORDS.current)
  }

  const labels = [
    {
      text: 'Move on click',
      spacing: 'justify-between',
      children: (
        <SwitchButton defaultValue={isMapClickable} onChange={(bool) => setIsMapClickable(bool)} />
      ),
    },
    {
      text: 'Set Zoom',
      spacing: 'justify-between',
      children: (
        <input
          type={'number'}
          min={0}
          max={100}
          onChange={(e) => setGeoState((prev) => ({ ...prev, zoom: e.target.value }))}
          defaultValue={geoState?.zoom}
        />
      ),
    },
  ]

  const sections = [
    {
      label: 'Actions',
      children: <Button text='Go random' loading={!isLocationReady} onClick={flyTo} />,
    },
    {
      label: 'IPs',
      children: <Indicator label='IP' value={useragent?.ip} allowCopy />,
    },
    {
      label: 'Coords',
      value: `${geoState.lat}, ${geoState.lng}`,
      allowCopy: true,
      allowReset: true,
      disabledReset: !isCoordsMoved,
      onReset: setCoordsToDefault,
      children: Object.keys(geoState)
        .filter((v) => !['error', 'IS_FIXED'].includes(v))
        .map((v, index) => (
          <Indicator
            label={v}
            supportText={DEFAULT_COORDS.current && DEFAULT_COORDS.current[v]}
            value={geoState[v]}
            allowCopy
          />
        )),
    },
    {
      label: 'Map Control',
      children: labels.map((label) => <Label {...label}>{label.children}</Label>),
    },
  ]

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
        {sections.map((section) => (
          <Section label={section.label} {...section}>
            {section.children}
          </Section>
        ))}
      </main>
    </div>
  )
}

export default DevPanel