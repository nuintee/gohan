// Consts
import { colors } from '@/config/colors'

// Icons
import { User as UserIcon, PulseLoader } from '@/components/icons'
import { SessionContextValue, signIn, signOut, useSession } from 'next-auth/react'
import { MouseEventHandler, useState } from 'react'
import useModals from '@/hooks/modals'

type UserProps = {
  isLoading?: boolean
  session?: SessionContextValue
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const User = (props: UserProps) => {
  // Contexts
  const { status, data } = useSession()
  const [isSignInProccess, setIsSignInProccess] = useState(false)

  const handleOnClick = async () => {
    if (status === 'authenticated') {
      // navigate to profile page
      signOut()
    } else if (status === 'unauthenticated') {
      setIsSignInProccess(true)
      await signIn('auth0')
      setIsSignInProccess(false)
    }
  }

  const {
    isLoading = (status === 'loading' || isSignInProccess) ?? false,
    session = { ...data, status } ?? {},
    onClick = handleOnClick,
  } = props

  const feedBack = !isLoading && 'active:scale-90 cursor-pointer active:opacity-90'

  const theme =
    session.status === 'authenticated'
      ? `h-12 aspect-square rounded-full overflow-hidden ${feedBack}`
      : `h-12 min-w-[6rem] rounded-full p-4 flex items-center justify-center border-[1px] text-white hover:bg-white hover:text-gh-dark bg-transparent ${feedBack}`

  return (
    <button className={theme} onClick={onClick}>
      {session.status === 'authenticated' ? (
        <img
          src={`https://ui-avatars.com/api/?name=${session.user?.name}&background=random`}
          alt='Profile Image'
          className='h-full w-full'
        />
      ) : isLoading ? (
        <PulseLoader color={colors['gh-l-gray']} loading={true} size={5} speedMultiplier={0.5} />
      ) : (
        'Login'
      )}
    </button>
  )
}

export default User
