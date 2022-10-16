// Components
import Texts from '../Restaurant/Texts'

const Toast = () => {
  return (
    <div className='bg-white p-4 rounded-md border-l-8 flex gap-4'>
      <span className='h-10 w-10 bg-red-200 flex items-center justify-center rounded-full'>X</span>
      <Texts main='Error' sub='Message' size='small' />
      <button className='ml-auto'>X</button>
    </div>
  )
}

export default Toast
