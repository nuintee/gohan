import DropDownLayout from '@/layouts/DropDownLayout'

const ToolTip = (props) => {
  return (
    <DropDownLayout
      controller={
        <div className='h-6 w-6 bg-gh-dark rounded-full flex items-center justify-center text-white'>
          i
        </div>
      }
      direction={'top'}
    >
      <p className='text-sm'>これはTooltipsです</p>
    </DropDownLayout>
  )
}

export default ToolTip
