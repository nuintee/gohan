import Image from 'next/image'

import { Regular } from '../Button'
import Texts from './Texts'
import Label from './Label'
import { Like, states } from './Like/index'

type Props = {
  state: typeof states[number]
  onClick: React.MouseEventHandler<HTMLDivElement>
  onLike: React.MouseEventHandler<HTMLButtonElement>
}

const Large = (props: Props) => {
  const { state, onLike, onClick } = props

  return (
    <div className='max-w-[20rem] rounded-xl overflow-hidden bg-white' onClick={onClick}>
      {/* <Image src='' alt='image' height={100} width={100} /> */}
      <img
        src={
          'https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80'
        }
        className='select-none max-h-52 w-full object-cover'
        draggable={false}
      />
      <div className='p-4 flex flex-col gap-4'>
        <Label distance={2} />
        <Texts main='Shakshack' sub='Italian・Spanish' />
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

const Small = (props: Props) => {
  const { state, onClick, onLike } = props

  return (
    <div
      className='flex bg-white p-2 rounded-md justify-between items-center gap-4 h-28 w-fill cursor-pointer active:bg-gray-50 active:scale-95'
      onClick={onClick}
    >
      <img
        src='https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80'
        className='max-h-full max-w-full h-auto w-auto aspect-square object-cover rounded-md'
        alt={'image'}
      />
      <div className='flex flex-1 gap-4 items-start'>
        <div className='flex flex-col gap-2'>
          <Texts main='' sub='' size='small' />
          <Label distance={2} />
        </div>
        <Like onClick={onLike} state={state} />
      </div>
    </div>
  )
}

const Restaurant = {
  Large,
  Small,
}

export { Restaurant, Like }
