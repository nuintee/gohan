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
  const { loading, user, onClick } = props

  const isAuthed = user && Object.keys(user).length

  if (loading) {
    return (
      <div className='flex bg-white rounded-full p-1 items-center gap-4 w-fit'>
        <button className='h-10 w-10 rounded-full bg-gh-l-gray animate-pulse'></button>
        <PulseLoader
          color={colors['gh-l-gray']}
          loading={true}
          size={5}
          speedMultiplier={0.5}
          className='mr-4'
        />
      </div>
    )
  }

  if (!isAuthed) {
    return (
      <div className='flex bg-white rounded-full p-1 items-center gap-2 w-fit'>
        <button className='h-10 w-10 rounded-full bg-gh-l-gray flex items-center justify-center'>
          <UserIcon.Guest />
        </button>
        <p className='select-none font-medium mr-4'>Guest</p>
      </div>
    )
  } else {
    return (
      <div className='flex bg-white rounded-full p-1 items-center gap-2 w-fit'>
        <button>
          <img
            className='h-10 w-10 rounded-full bg-gh-l-gray'
            src={`https://ui-avatars.com/api/?name=${user.username}`}
          />
        </button>
        <p className='select-none font-medium'>{user.username}</p>
        <button className='mx-4 outline-none'>
          <UserIcon.Signout width={15} height={15} />
        </button>
      </div>
    )
  }
}

export default User
