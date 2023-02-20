import { Close, Check, PulseLoader } from '@/components/icons'

const LocationLoader = ({
  isLoading,
  isError,
  error,
  absolute = false,
}: {
  isLoading: boolean
  isError: boolean
  error?: string | null
  absolute?: boolean
}) => {
  const absoluteClassName = 'absolute left-1/2 bottom-6 -translate-x-1/2'

  const ui = () => {
    switch (true) {
      case isLoading:
        return (
          <>
            <PulseLoader size={5} color={'gray'} />
            <p className='text-gh-dark'>現在地を取得中</p>
          </>
        )
      case isError:
        return (
          <>
            <Close />
            <p className='text-gh-dark'>{error || '現在地の取得に失敗'}</p>
          </>
        )
      default:
        return (
          <>
            <Check />
            <p className='text-gh-dark'>現在地取得済み</p>
          </>
        )
    }
  }

  return (
    <div
      className={`${
        absolute && absoluteClassName
      } flex gap-2 items-center justify-center border-2 px-4 py-2 border-gray-100 rounded-full`}
    >
      {ui()}
    </div>
  )
}

export default LocationLoader
