import { ResultsEntity } from '@/features/restaurants/types'
import ModalLayout from '@/layouts/ModalLayout'
import usePlacePhotos from '../hooks/useGoogleImage'

type Props = {
  isOpen: boolean
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  data: ReturnType<typeof usePlacePhotos>
}

const ImageModal = ({ isOpen, onClose, data }: Props) => {
  console.log(data)

  if (!data) return <></>

  return (
    <ModalLayout isOpen={isOpen} onRequestClose={onClose}>
      <section className='h-screen w-screen flex-1 p-12 object-contain' onClick={onClose}>
        <img
          src={data.url}
          width={data?.width}
          height={data?.height}
          className={'h-full w-full object-scale-down'}
        />

        {Boolean(data.html_attributions?.length) && (
          <div className='flex gap-1 mt-2 absolute left-0 bottom-0 bg-white bg-opacity-90 py-2 px-1 text-sm'>
            <p>撮影者: </p>
            {data.html_attributions?.map((v, i, arr) => {
              return (
                <>
                  <div className='font-semibold' dangerouslySetInnerHTML={{ __html: v }} />
                  {!Boolean(i === arr.length - 1) && ', '}
                </>
              )
            })}
          </div>
        )}
      </section>
    </ModalLayout>
  )
}

export default ImageModal
