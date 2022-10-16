// Consts
import { colors } from 'config/tailwind'

// Lib
import PulseLoader from 'react-spinners/PulseLoader'

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
        <span className='h-10 w-10 rounded-full bg-gh-l-gray animate-pulse'></span>
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
      <button className='flex bg-white rounded-full p-1 items-center gap-2 w-fit'>
        <span className='h-10 w-10 rounded-full bg-gh-l-gray'></span>
        <p className='select-none font-medium mr-4'>Guest</p>
      </button>
    )
  } else {
    return (
      <button className='flex bg-white rounded-full p-1 items-center gap-2 w-fit'>
        <img
          className='h-10 w-10 rounded-full bg-gh-l-gray'
          src={`https://ui-avatars.com/api/?name=${user.username}`}
        />
        <p className='select-none font-medium'>{user.username}</p>
        <button className='mr-4'>Logout</button>
      </button>
    )
  }
}

export default User
