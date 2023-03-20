import { PanelHeader, DetailsSummary } from '@/components/ui'
import { SORT_ENUM } from '@/constants/sort'
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
        data-testid={`basic_info__modal_key_${modalKey}`}
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
            {data.current_opening_hours?.periods
              ?.sort((a, b) => SORT_ENUM.ASC.sortFn(a.open, b.open, 'day') || 1)
              .map((v, index, arr) => {
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
                    <div>
                      {arr
                        .filter((item) => item.open.day === v.open.day)
                        .map((item) => (
                          <p>
                            {formatTimeString(item?.open?.time)} -{' '}
                            {formatTimeString(v?.close?.time)}
                          </p>
                        ))}
                    </div>
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
        <main className='flex flex-col' data-testid='basic_info__modal_main'>
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
