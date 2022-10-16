import Image from 'next/image'

import { Regular } from '../Button'
import Like from './Like/index'

type Props = {
  state: 'LIKED' | 'UNLIKED' | 'LOCKED'
  onLike: Function
}

const Restaurant = (props: Props) => {
  const { state, onLike } = props

  return (
    <div className='max-w-[20rem] rounded-xl overflow-hidden bg-white'>
      {/* <Image src='' alt='image' height={100} width={100} /> */}
      <div>
        <img
          src={
            'https://4.bp.blogspot.com/--9DwhZnX-l0/WNDaG628QkI/AAAAAAAAEFc/BhChqS3-qKYOi5dWkSjoh_wCByYZOBGCgCLcB/s1600/table-791167_1920.jpg'
          }
          className='select-none'
          draggable={false}
        />
      </div>
      <div className='p-4 flex flex-col gap-4'>
        <span className='bg-gh-gray w-fit px-2 py-1 rounded-md text-white'>
          {/* Indicator */}
          2km
        </span>
        <div>
          <h1 className='text-xl font-bold'>Shakeshack</h1>
          <p className='text-gh-l-gray'>Spanish・Italian</p>
        </div>
        <p className='bg-gh-l-orange text-center p-4 rounded-md'>
          Checkout more info from{' '}
          <a href='' className='text-gh-orange font-semibold'>
            Here
          </a>
        </p>
        <footer className='flex w-full gap-4'>
          {/* Footer */}
          <Regular text={'Navigate'} loading={false} onClick={() => {}} />
          <Like state={state} onClick={onLike} />
        </footer>
      </div>
    </div>
  )
}

export { Restaurant, Like }
