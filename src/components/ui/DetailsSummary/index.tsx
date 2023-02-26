import { Chevron } from '@/components/icons'
import CopyButton from '../CopyButton'

const DetailsSummary = ({
  ignored = false,
  summaryTitle,
  summaryValue,
  children,
  copyValue,
  copyColor,
}: {
  ignored?: boolean
  summaryTitle?: string
  summaryValue?: string
  children: JSX.Element
} & React.ComponentProps<typeof CopyButton>) => {
  return (
    <details className={`w-full group ${ignored && 'pointer-events-none'}`}>
      <summary className='flex items-center justify-between gap-4  cursor-pointer'>
        <div className='flex items-center gap-2'>
          {!ignored && <Chevron overrideClassName='rotate-90 group-open:-rotate-90 ml-1' />}
          <p>{summaryTitle}</p>
          {copyValue && <CopyButton copyColor={copyColor} copyValue={summaryValue} />}
        </div>
        <h2>{summaryValue}</h2>
      </summary>
      <div className='py-2 divide-y flex flex-col gap-1'>{children}</div>
    </details>
  )
}

export default DetailsSummary
