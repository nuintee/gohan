import { PulseLoader } from '@/components/icons'
import { DetailedHTMLProps, ImgHTMLAttributes, useState } from 'react'

const DEFAULT_FALLBACK = () => {
  return <PulseLoader color='gray' size={5} />
}

const FALLBACK = ({ isLoading, component }: { isLoading: boolean; component?: JSX.Element }) => {
  if (isLoading) {
    return component || <DEFAULT_FALLBACK />
  } else return <></>
}

type SuspenseImageProps = {
  fallback?: JSX.Element
  onErrorCallback?: () => void
  onLoadCallback?: () => void
} & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

const SuspenseImage = ({
  fallback,
  onErrorCallback,
  onLoadCallback,
  ...imgProps
}: SuspenseImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  function handleError() {
    setIsImageLoaded(true)
    onErrorCallback && onErrorCallback()
  }

  function handleLoad() {
    setIsImageLoaded(true)
    onLoadCallback && onLoadCallback()
  }

  return (
    <>
      <FALLBACK component={fallback} isLoading={!isImageLoaded} />
      <img
        {...imgProps}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          ...(!isImageLoaded && { display: 'none' }),
        }}
      />
    </>
  )
}

export default SuspenseImage
