import { ROUTES } from '@/constants/routes'
import { useRouter } from 'next/router'

const Promotion = ({ onClick = () => {} }: { onClick?: () => void }) => {
  const router = useRouter()
  const referer = (router.query?.referer as string) || router.asPath

  function handleClick() {
    router.push(`${ROUTES.SIGNIN.path}?referer=${encodeURIComponent(referer)}`)
    onClick && onClick()
  }

  return (
    <button
      onClick={handleClick}
      className='p-4 flex items-center w-full justify-center bg-gradient-to-r from-pink-500 via-gh-red to-gh-orange rounded-md h-[7.5rem] shadow-md duration-700 hover:scale-105 cursor-pointer font-semibold select-none text-white'
    >
      簡単にアカウントを作成してお気に入りの場所を保存しよう。
    </button>
  )
}

export default Promotion
