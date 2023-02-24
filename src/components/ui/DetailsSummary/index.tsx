import { Chevron } from '@/components/icons'

const DetailsSummary = ({
  ignored = false,
  summaryTitle,
  summaryValue,
  children,
}: {
  ignored?: boolean
  summaryTitle?: string
  summaryValue?: string
  children: JSX.Element
}) => {
  return (
    <details className={`w-full group ${ignored && 'pointer-events-none'}`}>
      <summary className='flex items-center justify-between  cursor-pointer'>
        <div className='flex items-center gap-2'>
          {!ignored && <Chevron overrideClassName='rotate-90 group-open:-rotate-90 ml-1' />}
          <p>{summaryTitle}</p>
        </div>
        <h2>{summaryValue}</h2>
      </summary>
      <div className='py-2 divide-y flex flex-col gap-1'>{children}</div>
    </details>
  )
}

export default DetailsSummary
