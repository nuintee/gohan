import { Logo } from '@/components/icons'

const LOGO_SIZE = 20

const Brand = () => {
  return (
    <div className='flex gap-2 items-center w-fit'>
      <div className='bg-gh-dark h-fit w-fit p-4 rounded-full'>
        <Logo height={LOGO_SIZE} width={LOGO_SIZE} />
      </div>
      <h1 className={`text-white font-bold font-poppins font-extrabold`}>GOHAN</h1>
    </div>
  )
}

export default Brand
