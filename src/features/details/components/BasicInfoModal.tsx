import { PanelHeader, DetailsSummary } from '@/components/ui'
import { ResultsEntity } from '@/features/restaurants/types'
import ModalLayout from '@/layouts/ModalLayout'
import { isNumber, isString } from '@/utils/typeguards'
import { BASIC_INFO_KEYS } from '../constants'
import formatTimeString from '../hooks/formatTimeString'
import mapBasicInfoKeys from '../hooks/mapBasicInfoKeys'
import parseOpenHours from '../hooks/parseOpenHours'

type Props = {
  isOpen: boolean
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  data: ResultsEntity
}

const BasicInfoModal = (props: Props) => {
  const { isOpen, onClose, data } = props

  const ui = (modalKey: any) => {
    const isHours = modalKey === 'current_opening_hours'
    const hasNoHourDetails = !data.current_opening_hours?.periods?.length

    const currentData = data[modalKey as keyof typeof data]
    const allowCopy = isString(currentData) || isNumber(currentData)

    return (
      <div
        className='even:bg-gh-pale bg-white p-4 flex gap-2 items-start justify-between'
        key={modalKey}
      >
        <DetailsSummary
          summaryTitle={mapBasicInfoKeys(modalKey)}
          summaryValue={
            isHours ? parseOpenHours(data.current_opening_hours).title : String(currentData)
          }
          ignored={!isHours || (isHours && hasNoHourDetails)}
          allowCopy={allowCopy}
        >
          <div className='py-2 flex flex-col gap-1'>
            {data.current_opening_hours?.periods?.map((v) => {
              if (!v.open?.date) return <></>

              return (
                <div
                  className='flex items-center justify-between w-full bg-white p-1 text-sm px-2 rounded-full'
                  key={v.open.day}
                >
                  <p className='text-gh-gray'>
                    {new Date(v?.open?.date).toLocaleString('ja-JP-u-ca-japanese', {
                      weekday: 'long',
                    })}
                  </p>
                  <p>
                    {formatTimeString(v?.open?.time)} - {formatTimeString(v?.close?.time)}
                  </p>
                </div>
              )
            })}
          </div>
        </DetailsSummary>
      </div>
    )
  }

  return (
    <ModalLayout isOpen={isOpen} onRequestClose={onClose}>
      <section className='w-[80vw] max-w-[30rem]'>
        <PanelHeader title='基本的な情報' onClose={onClose} />
        <main className='flex flex-col'>
          {Object.keys(data)
            .filter((v) =>
              BASIC_INFO_KEYS.includes(
                v as keyof Pick<typeof data, typeof BASIC_INFO_KEYS[number]>,
              ),
            )
            .map((j) => ui(j))}
        </main>
      </section>
    </ModalLayout>
  )
}

export default BasicInfoModal
