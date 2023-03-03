import { Chevron } from '@/components/icons'
import CopyButton from '../CopyButton'

const DetailsSummary = ({
  ignored = false,
  summaryTitle,
  summaryValue,
  children,
  allowCopy,
}: {
  ignored?: boolean
  summaryTitle?: string
  summaryValue?: string
  children: JSX.Element
  allowCopy?: boolean
}) => {
  const handleDetailsClick = (e) => {
    if (ignored) {
      e.preventDefault()
    }
  }

  return (
    <details className={`w-full group`} onClick={handleDetailsClick}>
      <summary
        className={`flex items-center justify-between gap-4  ${
          ignored ? 'cursor-default' : 'cursor-pointer'
        }`}
      >
        <div className='flex items-center gap-2'>
          {!ignored && <Chevron overrideClassName='rotate-90 group-open:-rotate-90 ml-1' />}
          <p className='whitespace-nowrap text-gh-d-gray'>{summaryTitle}</p>
          {allowCopy && <CopyButton copyValue={summaryValue} />}
        </div>
        <h2>{summaryValue}</h2>
      </summary>
      <div className='py-2 divide-y flex flex-col gap-1'>{children}</div>
    </details>
  )
}

export default DetailsSummary
