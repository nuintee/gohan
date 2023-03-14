import { ReviewStatus } from '@prisma/client'
import { UseFormRegister, Path } from 'react-hook-form'

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

const StatusRadioGroup = <T extends {}>({
  register,
  name,
}: {
  register: UseFormRegister<T>
  name: Path<T>
}) => {
  return (
    <div className='flex gap-6'>
      {[ReviewStatus.BAD, ReviewStatus.OK, ReviewStatus.GOOD].map((v) => (
        <div key={v}>
          <input
            {...register(name)}
            id={v}
            type='radio'
            value={v}
            className={'sr-only peer'}
            defaultChecked={v === status}
          />
          <label
            htmlFor={v}
            className={`sm:h-20 sm:w-20 h-16 w-16 cursor-pointer bg-gh-l-gray rounded-full flex items-center justify-center grayscale text-3xl ${
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
