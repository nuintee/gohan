import { useGeoLocation, useMapBox, useToast } from '@/hooks/context'
import React, { useState, useEffect, useRef } from 'react'
import useDirections from '../MapBox/hooks/Directions'
import { Regular as Button } from '@/components/Button'
import { Label, SwitchButton, Section, Indicator } from './components'
import { useSession, signIn, signOut } from 'next-auth/react'

import { version } from '@/../package.json'
import Input from '../Input'
import useGPS from '@/hooks/context/GPS'

const DevPanel = (props) => {
  const { useragent } = props
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const { toastState, setToastState, manageToast } = useToast()
  const { mapBoxState, setMapBoxState } = useMapBox()
  const { initialPosition, isMoved, currentPosition } = useGPS()

  const setCoordsToDefault = () => {
    setMapBoxState((prev) => ({ ...prev, ...initialPosition }))
  }

  const setFakeAuth = (bool) => {
    if (!bool) {
      signOut()
    } else {
      signIn('credentials')
    }
  }

  const showSession = () => {
    console.log(session)
  }

  const labels = [
    {
      text: 'Move on click',
      spacing: 'justify-between',
      children: (
        <SwitchButton
          defaultValue={mapBoxState.moveOnClick}
          onChange={(bool) => setMapBoxState((prev) => ({ ...prev, moveOnClick: bool }))}
        />
      ),
    },
    {
      text: 'Set Zoom',
      spacing: 'justify-between',
      children: (
        <Input
          type={'number'}
          value={mapBoxState?.zoom}
          onChange={(e) => setMapBoxState((prev) => ({ ...prev, zoom: e.target.value }))}
        />
      ),
    },
  ]

  const sections = [
    {
      label: 'Auth',
      children: (
        <>
          <Label text='Fake auth' spacing='justify-between'>
            <SwitchButton onChange={(bool) => setFakeAuth(bool)} defaultValue={session} />
          </Label>
          <Button onClick={showSession} text='Session Info' />
        </>
      ),
    },
    {
      label: 'IPs',
      children: <Indicator label='IP' value={useragent?.ip} allowCopy />,
    },
    {
      label: 'Mapbox',
      value: `${mapBoxState.latitude}, ${mapBoxState.longitude}`,
      allowCopy: true,
      allowReset: true,
      disabledReset: isMoved,
      onReset: setCoordsToDefault,
      children: Object.keys(mapBoxState)
        .filter((v) => !['padding'].includes(v))
        .map((v, index) => (
          <Indicator label={v} supportText={initialPosition[v]} value={mapBoxState[v]} allowCopy />
        )),
    },
    {
      label: 'Current Location',
      value: `${currentPosition.latitude}, ${currentPosition.longitude}`,
      allowCopy: true,
      allowReset: true,
      disabledReset: isMoved,
      onReset: setCoordsToDefault,
      children: Object.keys(currentPosition)
        .filter((v) => !['padding'].includes(v))
        .map((v, index) => (
          <Indicator
            label={v}
            supportText={initialPosition[v]}
            value={currentPosition[v]}
            allowCopy
          />
        )),
    },
    {
      label: 'Map Control',
      children: labels.map((label) => <Label {...label}>{label.children}</Label>),
    },
    {
      label: 'App Info',
      children: <Indicator label='Version' value={version} allowCopy />,
    },
  ]

  if (process.env.NODE_ENV !== 'development') return <></>

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className='z-[100] bg-gh-dark py-2 px-4 rounded-md text-white outline-none active:scale-90'
      >
        👨‍💻 DevTools
      </button>
    )

  return (
    <div className='z-[100] absolute left-0 top-0 bg-white h-screen min-w-[20rem] overflow-auto'>
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
