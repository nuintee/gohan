type TabData = {
  label: string
  id: number
}[]

type Props = {
  selectedId?: number
  onSelect: Function
  tabs: TabData[number][]
}

const Tab = (props: Props) => {
  const { tabs, selectedId, onSelect } = props

  return (
    <div className='flex items-center justify-center'>
      {tabs.map((tab, index) => (
        <button
          className={`flex-1 border-b-2 py-2 text-gh-gray ${
            tab.id == (selectedId || 0) && 'border-gh-orange text-black font-semibold'
          }`}
          key={tab.id}
          onClick={() => onSelect(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default Tab
