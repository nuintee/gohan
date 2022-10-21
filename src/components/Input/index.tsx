const Input = () => {
  return (
    <div className='w-full flex bg-gh-white rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-gh-l-gray'>
      <input
        type={'text'}
        className='flex-1 outline-none px-2 py-1 bg-transparent'
        placeholder='Text'
      />
      <button className='text-sm p-2 text-gh-gray outline-none active:text-black'>Action</button>
    </div>
  )
}

const InputGroup = () => {
  return (
    <div className='flex flex-col gap-1'>
      <label className='text-gh-gray'>Action</label>
      <Input />
    </div>
  )
}

export { Input, InputGroup }
