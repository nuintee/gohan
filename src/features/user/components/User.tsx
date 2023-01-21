// Consts
import { colors } from '@/config/colors'

// Icons
import { User as UserIcon, PulseLoader } from '@/components/icons'
import { SessionContextValue, useSession } from 'next-auth/react'
import { MouseEventHandler } from 'react'

type UserProps = {
  onClick: MouseEventHandler<HTMLButtonElement>
  isLoading: boolean
  session: SessionContextValue
}

const User = (props: UserProps) => {
  const { onClick, isLoading, session } = props

  if (session?.status === 'authenticated')
    return (
      <button className='h-12 aspect-square rounded-full overflow-hidden active:scale-90'>
        <img
          src={`https://ui-avatars.com/api/?name=${session.data.user?.name}&background=random`}
          alt='Profile Image'
          className='h-full w-full'
        />
      </button>
    )

  return (
    <button className='h-12 min-w-[6rem] rounded-full p-4 flex items-center justify-center border-2 bg-gh-white active:scale-90'>
      {isLoading ? (
        <PulseLoader color={colors['gh-l-gray']} loading={true} size={5} speedMultiplier={0.5} />
      ) : (
        'Login'
      )}
    </button>
  )
}

export default User
