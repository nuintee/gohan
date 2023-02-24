import { Chevron } from '@/components/icons'
import { PanelHeader } from '@/components/ui'
import { ResultsEntity } from '@/features/restaurants/types'
import ModalLayout from '@/layouts/ModalLayout'
import { BASIC_INFO_KEYS } from '../constants'
import useOpenHours from '../hooks/useOpenHours'

type Props = {
  isOpen: boolean
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  data: ResultsEntity
}

const BasicInfoModal = (props: Props) => {
  const { isOpen, onClose, data } = props

  const ui = (modalKey: any) => {
    // if (modalKey === 'opening_hours' && !data.opening_hours?.periods?.length) return <></>

    return (
      <div
        className='even:bg-gh-pale bg-white p-4 flex gap-2 items-start justify-between'
        key={modalKey}
      >
        {modalKey === 'opening_hours' ? (
          <details
            className={`w-full group ${
              !data.opening_hours?.periods?.length && 'pointer-events-none'
            }`}
          >
            <summary className='flex items-center justify-between  cursor-pointer'>
              <div className='flex items-center gap-2'>
                {data.opening_hours?.periods?.length && (
                  <Chevron overrideClassName='rotate-90 group-open:-rotate-90' />
                )}
                <p>{modalKey}</p>
              </div>
              <h2>{useOpenHours(data.opening_hours).title}</h2>
            </summary>
            <div className='py-2 divide-y flex flex-col gap-1'>
              {data.opening_hours?.periods?.map((v, i, original) => (
                <>
                  <div className='flex items-center justify-between w-full'>
                    <p>
                      {new Date(v?.open?.date).toLocaleString('ja-JP-u-ca-japanese', {
                        weekday: 'long',
                      })}
                    </p>
                    <p>
                      {v?.open?.time} - {v?.close?.time}
                    </p>
                  </div>
                </>
              ))}
            </div>
          </details>
        ) : (
          <>
            <p>{modalKey}</p>
            <h2>{data[modalKey]}</h2>
          </>
        )}
      </div>
    )
  }

  return (
    <ModalLayout isOpen={isOpen} onRequestClose={onClose}>
      <section>
        <PanelHeader title='基本的な情報' onClose={onClose} />
        <main className='min-w-[30rem] flex flex-col'>
          {Object.keys(data)
            .filter((v) => BASIC_INFO_KEYS.includes(v))
            .map((j) => ui(j))}
        </main>
      </section>
    </ModalLayout>
  )
}

export default BasicInfoModal
