import { signIn } from 'next-auth/react'

const Promotion = () => {
  return (
    <button
      onClick={() => signIn('google')}
      className='p-4 flex items-center w-full justify-center bg-gradient-to-r from-pink-500 via-gh-red to-gh-orange rounded-md h-[7.5rem] shadow-md duration-700 hover:scale-105 cursor-pointer font-semibold select-none text-white'
    >
      アカウントを作成してお気に入りの場所を保存しよう。
    </button>
  )
}

export default Promotion
