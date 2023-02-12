import { Logo } from '@/components/icons'

const LOGO_SIZE = 20

const Brand = ({ margin = false }: { margin?: boolean }) => {
  return (
    <div className={`flex gap-2 items-center ${margin && 'm-2'}`}>
      <div className='bg-gh-dark h-fit w-fit p-3 rounded-full'>
        <Logo height={LOGO_SIZE} width={LOGO_SIZE} />
      </div>
      <h1 className={`text-white font-poppins font-extrabold`}>GOHAN</h1>
    </div>
  )
}

export default Brand
