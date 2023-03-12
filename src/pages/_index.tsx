import { useSort } from '@/hooks/sort'
import useToast from '@/libs/react-toastify'
import { useState } from 'react'

const STRING_ARRAY = ['a', 'b', 'c', 'd', 'e', 'f']
const OBJECT_ARRAY = [
  {
    label: 'a',
  },
  {
    label: 'b',
  },
  {
    label: 'c',
  },
  {
    label: 'd',
  },
  {
    label: 'e',
  },
  {
    label: 'f',
  },
]

const Experiment = () => {
  const [strSort, setStrSort] = useState<'ASC' | 'DESC'>('ASC')
  const [objSort, setObjSort] = useState<'ASC' | 'DESC'>('DESC')

  const strSorted = useSort({
    array: STRING_ARRAY,
    sortKey: '',
    sortMethod: strSort,
    disabled: false,
  })

  const objSorted = useSort({
    array: OBJECT_ARRAY,
    sortKey: 'label',
    sortMethod: objSort,
    disabled: false,
  })

  return (
    <div className='flex flex-col gap-2'>
      <section>
        <header className='flex gap-2'>
          <h1 data-testid='strat'>STRING_ARRAY</h1>
          <button onClick={() => setStrSort('ASC')}>ASC</button>
          <button onClick={() => setStrSort('DESC')}>DESC</button>
        </header>
        <div>
          {strSorted.map((v) => (
            <p>{v}</p>
          ))}
        </div>
      </section>
      <section>
        <header className='flex gap-2'>
          <h1>OBJECT_ARRAY</h1>
          <button onClick={() => setObjSort('ASC')}>ASC</button>
          <button onClick={() => setObjSort('DESC')}>DESC</button>
        </header>
        <div>
          {objSorted.map((v) => (
            <p>{v.label}</p>
          ))}
        </div>
      </section>
      <button data-testid='success_modal_btn' onClick={() => useToast.success('Success Toast')}>
        Open Success Modal
      </button>
      <button data-testid='error_modal_btn' onClick={() => useToast.error('Error Toast')}>
        Open Error Modal
      </button>
    </div>
  )
}

export default Experiment
