// Consts
import { colors } from 'config/tailwind'

// Lib
import PulseLoader from 'react-spinners/PulseLoader'

// Icons
import UserIcon from '@/icons/User'

// Types
type Props = {
  loading: boolean
  user?: {
    id: string
    email: string
    username: string
    createdAt: string // Time string
  }
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const User = (props: Props) => {
  // Authed => User Sidebar state, Unauthed => Signin modal state
  const { loading, user, onClick } = props

  const isAuthed = user && Object.keys(user).length
  const icon = isAuthed ? (
    <img
      className='h-10 w-10 rounded-full bg-gh-l-gray'
      src={`https://ui-avatars.com/api/?name=${user.username}`}
    />
  ) : (
    <UserIcon.Guest />
  )

  return (
    <button
      className={`flex bg-white rounded-full p-1 items-center gap-4 w-fit z-[1] ${
        !loading && 'active:bg-opacity-90 active:scale-90'
      }`}
      disabled={loading}
      onClick={onClick}
    >
      <span
        className={`h-10 w-10 rounded-full flex items-center justify-center bg-gh-l-gray ${
          loading && 'animate-pulse'
        }`}
      >
        {!loading && icon}
      </span>
      {loading ? (
        <PulseLoader
          color={colors['gh-l-gray']}
          loading={true}
          size={5}
          speedMultiplier={0.5}
          className='mr-4'
        />
      ) : (
        <p className='select-none font-medium mr-4'>{isAuthed ? user.username : 'Guest'}</p>
      )}
    </button>
  )
}

export default User
