import SuspenseImage from '../SuspenseImage'

type Props = {
  isLoading?: boolean
  attributes?: string[] // parse as a html
} & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

const ImageChip = (props: Props) => {
  const {
    isLoading = false,
    src = 'https://source.unsplash.com/random',
    onClick = () => {},
  } = props

  if (isLoading) {
    return <div className='h-60 w-60 relative bg-gh-l-gray rounded-md shadow-sm' />
  }

  if (props.attributes) {
    return props.attributes.map((v) => <div dangerouslySetInnerHTML={{ __html: v }}></div>)
  }

  return (
    <SuspenseImage
      {...props}
      src={!isLoading && src}
      alt={!isLoading && 'Image'}
      className='aspect-square object-cover h-60 w-60 rounded-md shadow-md cursor-pointer hover:scale-105 duration-300 ease-out bg-gh-l-gray'
      onClick={onClick}
      disabled
    />
  )
}

export default ImageChip
