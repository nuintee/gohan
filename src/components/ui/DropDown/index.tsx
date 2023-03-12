import DropDownLayout from '@/layouts/DropDownLayout'

type DropDownMenu = {
  label: string
  onDropDownItemClick: () => void
  ignored?: boolean
}[]

type Props = {
  menu: DropDownMenu
  direction?: React.ComponentProps<typeof DropDownLayout>['direction']
} & React.ComponentProps<typeof DropDownLayout>

const DropDown = ({ menu, direction = 'bottom', isLoading = false, ...rest }: Props) => {
  return (
    <DropDownLayout
      direction={direction}
      ignored={!Boolean(menu?.length > 0)}
      isLoading={isLoading}
      {...rest}
    >
      <>
        {menu.map((v) => (
          <button
            className='text-left whitespace-nowrap p-2 rounded-md hover:bg-gray-200  hover:text-gh-dark text-gh-gray text-sm'
            onClick={() => v.onDropDownItemClick()}
            key={v.label}
          >
            {v.label}
          </button>
        ))}
      </>
    </DropDownLayout>
  )
}

export default DropDown
