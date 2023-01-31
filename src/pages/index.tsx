import { GohanButton, ToastCatcher } from '@/components/ui'
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
import User from '@/features/user/components/User'
import useModals from '@/hooks/modals'
import UserAuthConsentDialog from '@/features/user/components/UserAuthConsentDialog'
import AcitvityButton from '@/features/activities/components/ActivityButton'
import useActivities from '@/features/activities/hooks'
import UserSettingsModal from '@/features/user/components/UserSettingsModal'

const Index = () => {
  const session = useSession()
  const { open, close, isOpen } = useModals()

  return (
    <>
      <div className='flex flex-col gap-4'>
        <section className='absolute top-0 left-0 z-[1] w-full p-4 flex gap-4 justify-between'>
          <User
            session={session}
            isLoading={session.status === 'loading'}
            onClick={() => open(session.status === 'authenticated' ? 'usersettings' : 'userauth')}
          />
          <AcitvityButton />
        </section>
        <MapBox />
        <section className='absolute bottom-0 left-0 z-[1] w-full flex items-center justify-center p-4'>
          <GohanButton />
        </section>
      </div>
      <UserAuthConsentDialog
        isOpen={isOpen('userauth')}
        onClose={() => close('userauth')}
        type={session.status === 'authenticated' ? 'signout' : 'login'}
      />
      <UserSettingsModal
        user={session.data?.user}
        isOpen={isOpen('usersettings')}
        onClose={() => close('usersettings')}
      />
      <ToastCatcher position='top-center' />
    </>
  )
}

export default Index
