// Consts
import { colors } from '@/config/colors'

// Icons
import { User as UserIcon, PulseLoader } from '@/components/icons'
import { Session } from 'next-auth'
import { SessionContextValue, useSession } from 'next-auth/react'

// Types
type Props = {
  loading: boolean
  user?: {
    id: string
    email?: string
    name?: string
    // createdAt: string // Time string
  }
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

// const User = (props: Props) => {
//   // Authed => User Sidebar state, Unauthed => Signin modal state
//   const { loading, onClick } = props

//   const isAuthed = session
//   const icon = isAuthed ? (
//     <img
//       className='h-10 w-10 rounded-full bg-gh-l-gray'
//       src={`https://ui-avatars.com/api/?name=${session?.user?.name}`}
//     />
//   ) : (
//     // <UserIcon.Guest />
//   )

//   return (
//     <button
//       className={`flex bg-white rounded-full p-1 items-center gap-4 w-fit z-[1] ${
//         !loading && 'active:bg-opacity-90 active:scale-90'
//       }`}
//       disabled={loading}
//       onClick={onClick}
//     >
//       <span
//         className={`h-10 w-10 rounded-full flex items-center justify-center bg-gh-l-gray ${
//           loading && 'animate-pulse'
//         }`}
//       >
//         {!loading && icon}
//       </span>
//       {loading ? (
//         <PulseLoader
//           color={colors['gh-l-gray']}
//           loading={true}
//           size={5}
//           speedMultiplier={0.5}
//           className='mr-4'
//         />
//       ) : (
//         <p className='select-none font-medium mr-4'>{isAuthed ? session?.user?.name : 'Guest'}</p>
//       )}
//     </button>
//   )
// }

type UserProps = {
  onClick: Function
  isLoading: boolean
  session: SessionContextValue
}

const User = (props: UserProps) => {
  const { onClick, isLoading, session } = props

  return (
    <button
      className={`flex bg-white rounded-full p-1 items-center gap-4 w-fit z-[1] ${
        !isLoading && 'active:bg-opacity-90 active:scale-90'
      }`}
    >
      <span
        className={`h-10 w-10 rounded-full flex items-center justify-center bg-gh-l-gray ${
          isLoading && 'animate-pulse'
        }`}
      >
        {!isLoading && <UserIcon.Guest />}
        {isLoading ? (
          <PulseLoader
            color={colors['gh-l-gray']}
            loading={true}
            size={5}
            speedMultiplier={0.5}
            className='mr-4'
          />
        ) : (
          <p className='select-none font-medium mr-4'>{session?.data?.user?.name || 'Guest'}</p>
        )}
      </span>
    </button>
  )
  //   if (!session || session?.status === 'unauthenticated') return <div>Unauthed User</div>

  //   if (isLoading) {
  //     return <div>Loading</div>
  //   }
  //   return <div>Authed User</div>
}

export default User
