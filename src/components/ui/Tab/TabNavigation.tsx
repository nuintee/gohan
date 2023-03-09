const TabNavigation = ({
  tabIndex,
  tabItems,
  onSelect,
  disabled = false,
}: {
  tabIndex: number
  tabItems: Record<'label', string>[]
  onSelect: (_index: number) => void
  disabled?: boolean
}) => {
  if (disabled) return <></>

  return (
    <div className='mt-8'>
      {tabItems?.map((v, i) => (
        <button
          onClick={() => onSelect(i)}
          className={`px-8 py-4 bg-white flex-1 border-b-2 outline-none ${
            tabIndex === i ? 'border-gh-orange font-semibold' : 'border-gh-pale text-gh-d-gray'
          }`}
          key={v.label}
        >
          {v.label}
        </button>
      ))}
    </div>
  )
}

export default TabNavigation
