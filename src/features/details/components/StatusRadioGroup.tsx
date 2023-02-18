import { ReviewStatus } from '@prisma/client'
import { UseFormRegister, FieldValues } from 'react-hook-form'

const statusTheme = (statusValue: ReviewStatus) => {
  const _grayScale = 'peer-checked:grayscale-0'

  switch (statusValue) {
    case 'BAD':
      return {
        color: `peer-checked:bg-gh-l-red peer-checked:ring-2 ring-gh-red ${_grayScale}`,
        emoji: '😡',
      }
    case 'GOOD':
      return {
        color: `peer-checked:bg-gh-l-green peer-checked:ring-2 ring-gh-green ${_grayScale}`,
        emoji: '😄',
      }
    case 'OK':
      return {
        color: `peer-checked:bg-gh-yellow peer-checked:ring-2 ring-gh-yellow ${_grayScale}`,
        emoji: '😕',
      }
    default:
      return {
        color: `peer-checked:gh-gh-l-gray peer-checked:ring-2 ring-gh-gray ${_grayScale}`,
        emoji: '',
      }
  }
}

const StatusRadioGroup = ({
  status,
  register,
}: {
  status: ReviewStatus
  register: UseFormRegister<FieldValues>
}) => {
  return (
    <div className='flex gap-6'>
      {[ReviewStatus.BAD, ReviewStatus.GOOD, ReviewStatus.OK].map((v) => (
        <div key={v}>
          <input
            {...register('reviewStatus')}
            id={v}
            type='radio'
            value={v}
            className={'sr-only peer'}
            defaultChecked={v === status}
          />
          <label
            htmlFor={v}
            className={`h-20 w-20 cursor-pointer bg-gh-l-gray rounded-full flex items-center justify-center grayscale text-3xl ${
              statusTheme(v).color
            } flex`}
          >
            {statusTheme(v).emoji}
          </label>
        </div>
      ))}
    </div>
  )
}

export default StatusRadioGroup
