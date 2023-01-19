import { useMapBox, useToast } from '@/hooks/context'
import React, { useState, useEffect, useRef } from 'react'
import useDirections from '../MapBox/hooks/Directions'
import { Regular as Button } from '@/components/Button'
import { Label, SwitchButton, Section, Indicator } from './components'
import { useSession, signIn, signOut } from 'next-auth/react'

import { version } from '@/../package.json'
import Input from '../Input'
import useGPS from '@/hooks/context/GPS'
import useRestaurantSearch from '@/hooks/API/restaurant'
import { DEFAULT_DEV_COORDS } from '@/constants/coords'
import useRestaurants from '@/hooks/context/Restaurants'
import useTables from '@/hooks/API/tables'
import { randomUUID } from 'crypto'
import { fetchRestaurantDetail } from '@/utils/place'

const DevPanel = (props) => {
  const { useragent } = props
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const { toastState, setToastState, manageToast } = useToast()
  const { getAllActivities, addActivity, getUserAllActivities } = useTables()
  const {
    mapBoxState,
    setMapBoxState,
    isViewStateChanged,
    setToDefaultViewState,
    MAPBOX_DEFAULT,
    isNavigating,
  } = useMapBox()
  const { restaurant } = useRestaurants()
  const { initialPosition, isMoved, currentPosition, setToDefaultGPS } = useGPS()
  const { getRoute } = useRestaurantSearch()

  const FAKE_COORDS = {
    latitude: 42.6485419,
    longitude: 23.4086112,
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

  const mapLabels = [
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
      label: 'Actions',
      children: (
        <>
          <Button
            text='Get Route'
            onClick={() =>
              getRoute({ profileType: 'walking', start: DEFAULT_DEV_COORDS, end: FAKE_COORDS })
            }
          />
          <Button
            text='Get all activities'
            onClick={async () => console.log(await getAllActivities())}
          />
          <Button
            text='Get restaurant'
            onClick={async () =>
              console.log(await (await fetch('/api/place/ChIJ6_7BNfyGqkAR-N0pM-lbono')).json())
            }
          />
          <Button
            text='Add Activity'
            onClick={async () =>
              console.log(
                await addActivity({
                  user_id: session?.user?.id,
                  place_id: restaurant?.data?.place_id,
                }),
              )
            }
          />
          <Button
            text='Get Use Activity'
            onClick={async () =>
              console.log(await getUserAllActivities({ user_id: session?.user?.id }))
            }
          />
        </>
      ),
    },
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
      disabledReset: !isViewStateChanged,
      onReset: setToDefaultViewState,
      children: Object.keys(mapBoxState)
        .filter((v) => !['padding'].includes(v))
        .map((v, index) => (
          <Indicator
            label={v}
            supportText={MAPBOX_DEFAULT[v]?.toString()}
            value={mapBoxState[v]?.toString()}
            allowCopy
          />
        )),
    },
    {
      label: 'Map Control',
      children: mapLabels.map((label) => <Label {...label}>{label.children}</Label>),
    },
    {
      label: 'Restaurant States',
      children: (
        <>
          <Indicator label='isNavigating' value={isNavigating.toString()} />
          <Indicator label='isFetching' value={restaurant?.isFetching?.toString()} />
        </>
      ),
    },
    {
      label: 'Current Location',
      value: `${currentPosition.latitude}, ${currentPosition.longitude}`,
      allowCopy: true,
      allowReset: true,
      disabledReset: !isMoved,
      onReset: setToDefaultGPS,
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
