type Props = {
  isLoading?: boolean
} & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

const ImageChip = (props: Props) => {
  const { isLoading = false, onClick = () => {} } = props

  return (
    <img
      {...props}
      src={!isLoading && `https://source.unsplash.com/random`}
      alt={!isLoading && 'Image'}
      className='aspect-square object-cover h-60 w-60 rounded-md shadow-md cursor-pointer hover:scale-105 duration-300 ease-out bg-gh-l-gray'
      onClick={onClick}
    />
  )
}

export default ImageChip
