import { useGeoLocation, useToast } from '@/hooks/context'
import { Copy } from '@/icons'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useState, useEffect, useRef } from 'react'
import useDirections from '../MapBox/hooks/Directions'
import { GetServerSideProps } from 'next'

type IndicatorProps = {
  label: string
  value?: string | number | null
  supportText?: string
  allowCopy: boolean
  onSuccessCopy: Function
  onErrorCopy: Function
  children: React.ReactChildren
}

interface SectionProps extends IndicatorProps {
  allowReset: boolean
  disabledReset: boolean
  onReset: Function
}

const copy = (text: string, onSuccessCopy: Function, onErrorCopy: Function) => {
  navigator.clipboard.writeText(text).then(
    function () {
      console.log('Async: Copying to clipboard was successful!')
      //   manageToast({
      //     isOpen: true,
      //     main: 'Copied!',
      //     sub: text,
      //     mode: 'success',
      //   })
      onSuccessCopy(text)
    },
    function (err) {
      //   manageToast({
      //     isOpen: true,
      //     main: 'Copy Failed',
      //     sub: err.message,
      //     mode: 'error',
      //   })
      onErrorCopy(err)
    },
  )
}

const Section = (props: SectionProps) => {
  const { label, value, supportText, allowCopy, allowReset, disabledReset, children } = props
  const { manageToast } = useToast()

  const copyHandle = (text: string) => {
    copy(
      text,
      (str) => {
        manageToast({
          isOpen: true,
          main: 'Copied!',
          sub: str,
          mode: 'success',
        })
      },
      (error) => {
        manageToast({
          isOpen: true,
          main: 'Copy Failed',
          sub: error.message,
          mode: 'error',
        })
      },
    )
  }

  return (
    <section className='flex flex-col gap-2 justify-between'>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <p className='flex items-center gap-1 text-gh-gray'>
            {label}
            <span className='text-xs text-gh-gray'>{supportText && `(${supportText})`}</span>
          </p>
          {allowCopy && (
            <button
              className='text-gray-400 active:text-gray-300'
              onClick={() => copyHandle(value)}
            >
              <Copy />
            </button>
          )}
        </div>
        {allowReset && (
          <button
            className={`text text-gh-gray  ${
              !disabledReset && 'active:text-opacity-50 text-blue-500'
            }`}
            onClick={() => {}}
            disabled={disabledReset}
          >
            reset
          </button>
        )}
      </div>

      <div className='flex flex-col gap-2 justify-between'>{children}</div>
    </section>
  )
}

const Indicator = (props: IndicatorProps) => {
  const { label, value, supportText, allowCopy } = props
  const { manageToast } = useToast()

  const copyHandle = (text: string) => {
    copy(
      text,
      (str) => {
        manageToast({
          isOpen: true,
          main: 'Copied!',
          sub: str,
          mode: 'success',
        })
      },
      (error) => {
        manageToast({
          isOpen: true,
          main: 'Copy Failed',
          sub: error.message,
          mode: 'error',
        })
      },
    )
  }

  return (
    <div className='bg-gh-white py-2 px-4 rounded-md text-gh-black outline-none flex justify-between gap-2'>
      <p className='flex items-center gap-1'>
        {label}: {value}
        <span className='text-xs text-gh-gray'>{supportText && `(${supportText})`}</span>
      </p>
      {allowCopy && (
        <button className='text-gray-400 active:text-gray-300' onClick={() => copyHandle(value)}>
          <Copy />
        </button>
      )}
    </div>
  )
}

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
        <p className='font-bold'>Dev Tools</p>
        <button
          onClick={() => setIsOpen(false)}
          className='z-[100] bg-gh-dark py-2 px-4 rounded-md text-white outline-none active:scale-90'
        >
          CLOSE
        </button>
      </header>
      <hr></hr>
      <main className='flex flex-col gap-4 p-4'>
        <button
          className='bg-gh-dark py-2 px-4 rounded-md text-white outline-none active:scale-90'
          onClick={flyTo}
          disabled={!isLocationReady}
        >
          ✈️ FlyTo
        </button>
        <button
          className='bg-gh-dark py-2 px-4 rounded-md text-white outline-none active:scale-90'
          onClick={authHandle}
        >
          {session ? 'SIGNOUT' : 'SIGNIN'}
        </button>

        <Indicator label='IP' value={useragent?.ip} allowCopy />

        <Section label='IPs' value={10} allowReset disabledReset={true} allowCopy>
          <Indicator label='IP' value={useragent?.ip} allowCopy />
          <Indicator label='IP' value={useragent?.ip} allowCopy />
          <Indicator label='IP' value={useragent?.ip} allowCopy />
        </Section>

        <section className='flex flex-col gap-2 justify-between'>
          <div className='flex justify-between'>
            <div className='flex gap-2'>
              <label className='text-gh-gray'>Coords</label>
              <button
                className='text-gray-400 active:text-gray-300'
                onClick={() => copy(`${geoState.lat}, ${geoState.lng}`)}
              >
                <Copy />
              </button>
            </div>
            <button
              className={`text text-gh-gray  ${
                isCoordsMoved && 'active:text-opacity-50 text-blue-500'
              }`}
              onClick={setCoordsToDefault}
              disabled={!isCoordsMoved}
            >
              reset
            </button>
          </div>

          <Indicator
            label='Latitude'
            supportText={DEFAULT_COORDS.current?.lat}
            value={geoState.lat}
            allowCopy
          />

          <Indicator
            label='Longitude'
            supportText={DEFAULT_COORDS.current?.lng}
            value={geoState.lng}
            allowCopy
          />
        </section>

        <fieldset className='flex gap-2 justify-between'>
          <legend className='mb-2 text-gh-gray'>Move position on click</legend>
          <div className='flex gap-2'>
            <input
              type='radio'
              id='map_clickable'
              name='map_click'
              value='true'
              defaultChecked={isMapClickable}
              onInput={(e) => setIsMapClickable(true)}
            />
            <label htmlFor='map_clickable'>On</label>
          </div>
          <div className='flex gap-2'>
            <input
              type='radio'
              id='map_unclickable'
              name='map_click'
              value='false'
              defaultChecked={!isMapClickable}
              onInput={(e) => setIsMapClickable(false)}
            />
            <label htmlFor='map_unclickable'>Off</label>
          </div>
        </fieldset>
      </main>
    </div>
  )
}

export default DevPanel
