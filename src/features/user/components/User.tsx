// Consts
import { colors } from '@/config/colors'

// Icons
import { PulseLoader } from '@/components/icons'
import { useSession } from 'next-auth/react'
import { MouseEventHandler } from 'react'
import useModals from '@/hooks/modals'
import SuspenseImage from '@/components/ui/SuspenseImage'
import { useRouter } from 'next/router'
import { ROUTES } from '@/constants/routes'

type UserProps = {
  isLoading?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const User = (props: UserProps) => {
  // Contexts
  const { status, data: session } = useSession()
  const router = useRouter()
  const referer = (router.query?.referer as string) || router.asPath

  const { open } = useModals()

  console.log(session)

  const handleOnClick = async () => {
    if (status === 'authenticated') {
      open('usersettings')
    } else if (status === 'unauthenticated') {
      router.push(`${ROUTES.SIGNIN.path}?referer=${encodeURIComponent(referer)}`)
    }
  }

  const { isLoading = status === 'loading' ?? false, onClick = handleOnClick } = props

  const feedBack = !isLoading && 'active:scale-90 cursor-pointer active:opacity-90'

  const theme =
    status === 'authenticated'
      ? `sm:h-12 h-10 aspect-square rounded-full overflow-hidden ${feedBack}`
      : `h-10 sm:min-w-[6rem] w-fit rounded-md sm:p-4 p-1 whitespace-nowrap flex items-center justify-center border-[1px] bg-white text-gh-dark ${feedBack}`

  return (
    <button className={theme} onClick={onClick} data-testid={`user_${status}__button`}>
      {status === 'authenticated' ? (
        <SuspenseImage
          src={
            session.user?.image ||
            `https://ui-avatars.com/api/?name=${session.user?.name}&background=random`
          }
          alt='Profile Image'
          className='h-full w-full'
          disabled
          referrerPolicy='no-referrer'
        />
      ) : isLoading ? (
        <PulseLoader color={colors['gh-l-gray']} loading={true} size={5} speedMultiplier={0.5} />
      ) : (
        'ログイン'
      )}
    </button>
  )
}

export default User
