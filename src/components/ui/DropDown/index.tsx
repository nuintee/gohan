import Button from '../Button'

import DropDownLayout from '@/layouts/DropDownLayout'

type DropDownMenu = {
  label: string
  onDropDownItemClick: () => void
  ignored: boolean
}[]

type Props = {
  menu: DropDownMenu
  direction?: React.ComponentProps<typeof DropDownLayout>['direction']
  isLoading?: boolean
}

const DropDown = ({ menu, direction = 'bottom', isLoading }: Props) => {
  return (
    <DropDownLayout
      direction={direction}
      ignored={!Boolean(menu?.length > 0)}
      isLoading={isLoading}
    >
      <>
        {menu.map((v) => (
          <button
            className='text-left whitespace-nowrap p-2 rounded-md hover:bg-gray-200  hover:text-gh-dark text-gh-gray text-sm'
            onClick={() => v.onDropDownItemClick()}
          >
            {v.label}
          </button>
        ))}
      </>
    </DropDownLayout>
  )
}

export default DropDown
