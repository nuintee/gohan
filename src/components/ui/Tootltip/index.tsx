import DropDownLayout from '@/layouts/DropDownLayout'

const ToolTip = ({ text }: { text?: string }) => {
  return (
    <DropDownLayout
      overrideStyle='bg-gh-orange p-4 rounded-md shadow-sm mb-4'
      controller={
        <div className='h-6 w-6 bg-gh-dark rounded-full flex items-center justify-center text-white'>
          i
        </div>
      }
      direction={'top'}
    >
      <p className='text-sm text-white'>{text}</p>
      <div className='absolute bottom-0 right-0 bg-gh-orange h-3 w-3 rotate-45 translate-y-1/2 -translate-x-full'></div>
    </DropDownLayout>
  )
}

export default ToolTip
