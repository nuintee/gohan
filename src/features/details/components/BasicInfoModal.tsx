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
    if (modalKey === 'opening_hours') {
      return (
        <>
          <details>
            <summary>{modalKey}</summary>
            <div>
              {data[modalKey].periods?.map((v) => (
                <p>{v.open.time}</p>
              ))}
            </div>
          </details>
          <h2>{data.opening_hours?.open_now?.toString()}</h2>
        </>
      )
    } else {
      return (
        <>
          <p>{modalKey}</p>
          <h2>{data[modalKey]}</h2>
        </>
      )
    }
  }

  return (
    <ModalLayout isOpen={isOpen} onRequestClose={onClose}>
      <section>
        <PanelHeader title='基本的な情報' onClose={onClose} />
        <main className='min-w-[30rem] flex flex-col'>
          {Object.keys(data)
            .filter((v) => BASIC_INFO_KEYS.includes(v))
            .map((j) => (
              <div
                className='even:bg-gh-pale bg-white p-4 flex gap-2 items-center justify-between'
                key={j}
              >
                {ui(j)}
              </div>
            ))}
        </main>
      </section>
    </ModalLayout>
  )
}

export default BasicInfoModal
