import { ToastCatcher } from '@/components/ui'
import useDirections from '@/features/directions/hooks'
import MapBox from '@/features/mapbox/components/MapBox'
import useMapBox from '@/features/mapbox/hooks'
import { mapBoxState } from '@/features/mapbox/stores'
import useUser from '@/features/user/hooks'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { signOut, useSession, signIn } from 'next-auth/react'

// ENV
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, BASE_URL } from '@/config/env'

const Index = () => {
  const { status } = useSession()
  const { update, get } = useUser()
  const updateUser = update({
    email: 'ex@example.com',
  })

  const getUser = get()

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='absolute top-0 left-0'>
          <p>{JSON.stringify(getUser?.data)}</p>
          <button onClick={() => updateUser.mutate()}>Update</button>
          <button
            onClick={
              status === 'authenticated'
                ? () => signOut({ callbackUrl: `${BASE_URL}/api/federate-logout` })
                : () => signIn('auth0')
            }
          >
            {status === 'authenticated' ? 'signout' : 'signin'}
          </button>
        </div>
        {/* <MapBox /> */}
      </div>
      <ToastCatcher position='top-center' />
    </>
  )
}

export default Index
