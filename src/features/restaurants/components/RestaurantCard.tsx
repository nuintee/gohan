// config
import { colors } from '@/config/colors'

// components
import { Button, Texts, Label } from '@/components/ui'
import LikeButton from './LikeButton'

// icons
import { Close } from '@/components/icons'

// const _Small = (props: SmallProps) => {
//   const { data, isLiked, isLocked, distance, onLike, onClick } = props

//   return (
//     <div
//       className='flex bg-white p-2 rounded-md justify-between items-center gap-4 h-28 w-fill cursor-pointer active:bg-gray-50 active:scale-95'
//       onClick={onClick}
//     >
//       <img
//         src={'getImageURL(data?.photos)'}
//         alt={`${data?.name}'s thumbnail`}
//         className={`max-h-full max-w-full h-auto w-auto aspect-square object-cover rounded-md`}
//       />
//       <div className='flex flex-1 gap-4 items-start justify-between'>
//         <div className='flex flex-col gap-2'>
//           <Texts main={data?.name} sub={data?.types?.join('・')} size='small' />
//           <Label distance={distance} />
//         </div>
//         <Like onClick={onLike} isLiked={isLiked} isLocked={isLocked} />
//       </div>
//     </div>
//   )
// }

// const _Card = (props: CardProps) => {
//   const { data, isLiked, isLocked, distance, onLike, isNavigating, isLoading, onClick, onClose } =
//     props

//   return (
//     <div className='max-w-[20rem] rounded-md overflow-hidden bg-white relative'>
//       <button className='absolute left-[1rem] top-[1rem] outline-none z-10' onClick={onClose}>
//         <Close fill={"colors['gh-white']"} />
//       </button>
//       <img
//         src={'getImageURL(props?.data?.photos)'}
//         alt={`${data?.name}'s thumbnail`}
//         className={`select-none max-h-52 w-full object-cover h-52`}
//         draggable={false}
//       />
//       <div className='p-4 flex flex-col gap-4'>
//         {/* <Label distance={distance} extraClassName={''} />
//         <Texts main={data?.name} sub={data?.types?.join('・')} /> */}
//         {data?.website && (
//           <p className='bg-gh-l-orange text-center p-4 rounded-md'>
//             Checkout more data from{' '}
//             <a href={data?.website} className='text-gh-orange font-semibold'>
//               Here
//             </a>
//           </p>
//         )}
//         <footer className='flex w-full gap-4'>
//           {/* Footer */}
//           <Button
//             text={isNavigating ? 'Stop Navigation' : 'Navigate'}
//             loading={isLoading}
//             onClick={onClick}
//             icon={{
//               position: 'before',
//               src: isNavigating && <Close fill='#FFF' />,
//             }}
//           />
//           <LikeButton onClick={onLike} isLiked={isLiked} isLocked={isLocked} />
//         </footer>
//       </div>
//     </div>
//   )
// }

const RestaurantCard = (props) => {
  return (
    <div className='max-w-[20rem] rounded-md overflow-hidden bg-white relative'>
      <button className='absolute left-[1rem] top-[1rem] outline-none z-10' onClick={() => {}}>
        <Close fill={colors['gh-white']} />
      </button>
      <img
        src={'getImageURL(props?.data?.photos)'}
        alt={`'s thumbnail`}
        className={`select-none max-h-52 w-full object-cover h-52`}
        draggable={false}
      />
      <div className='p-4 flex flex-col gap-4'>
        <Label text={'2000M'} extraClassName={''} />
        <Texts main={'data?.name'} sub={"data?.types?.join('・')"} />
        <footer className='flex w-full gap-4'>
          <Button text='ASS' />
          <LikeButton isLiked={true} isLocked={true} />
        </footer>
      </div>
    </div>
  )
}

export default RestaurantCard
