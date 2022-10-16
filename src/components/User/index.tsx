// Consts
import { colors } from 'config/tailwind'

// Lib
import PulseLoader from 'react-spinners/PulseLoader'

// Types
type Props = {
  loading: boolean
  user?: {}
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const User = (props: Props) => {
  const { loading, user, onClick } = props

  if (loading) {
    return (
      <div className='flex animate-skeleton bg-white rounded-full p-1 pr-4 items-center gap-4 w-fit'>
        <span className='h-10 w-10 rounded-full bg-gh-l-gray animate-pulse'></span>
        <PulseLoader color={colors['gh-l-gray']} loading={true} size={5} speedMultiplier={0.5} />
      </div>
    )
  }

  if (!user) {
    return <div>GUEST</div>
  } else {
    return <div>USER</div>
  }
}

export default User
