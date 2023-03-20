import { PulseLoader } from '@/components/icons'
import { colors } from '@/config/colors'

const LoadingFallback = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <PulseLoader color={colors['gh-l-gray']} />
    </div>
  )
}

export default LoadingFallback
