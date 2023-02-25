import SuspenseImage from '@/components/ui/SuspenseImage'
import usePlacePhotos from '../../hooks/usePlacePhotos'

type Props = {
  isLoading?: boolean
} & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

const DetailsHeroImage = (props: Props) => {
  const {
    isLoading = false,
    src = 'https://source.unsplash.com/random',
    onClick = () => {},
  } = props

  if (isLoading) {
    return <div className='h-60 w-60 relative bg-gh-l-gray rounded-md shadow-sm' />
  }

  return (
    <SuspenseImage
      {...props}
      src={!isLoading && src}
      alt={!isLoading && 'Image'}
      className='aspect-square object-cover sm:h-60 sm:w-60 w-20 h-20 rounded-md shadow-md cursor-pointer hover:scale-105 duration-300 ease-out bg-gh-l-gray'
      onClick={onClick}
      disabled
    />
  )
}

export default DetailsHeroImage
