import { PanelHeader } from '@/components/ui'
import { ResultsEntity } from '@/features/restaurants/types'
import ModalLayout from '@/layouts/ModalLayout'

type Props = {
  isOpen: boolean
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  data: ResultsEntity
} & Partial<ResultsEntity>

const BasicInfoModal = (props: Props) => {
  const { isOpen, onClose, data } = props

  return (
    <ModalLayout isOpen={isOpen} onRequestClose={onClose}>
      <section>
        <PanelHeader title='基本的な情報' onClose={onClose} />
        <main className='min-w-[30rem] flex flex-col'>
          {Object.keys(data)
            .filter((v) => ['name', 'rating'].includes(v))
            .map((j) => (
              <div
                className='even:bg-gh-pale bg-white p-4 flex gap-2 items-center justify-between'
                key={j}
              >
                <p>{j}</p>
                <h2>{data[j]}</h2>
              </div>
            ))}
        </main>
      </section>
    </ModalLayout>
  )
}

export default BasicInfoModal
