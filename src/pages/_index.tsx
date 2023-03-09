import useGetUserActivities from '@/features/activities/hooks/useGetUserActivities'
import { useState } from 'react'

import { useSort } from '@/hooks/sort'
import { useFilter } from '@/hooks/filter'
import { ReviewStatus } from '@prisma/client'

const Experiment = () => {
  const allActivities = useGetUserActivities()

  const [method, setMethod] = useState<'ASC' | 'DESC'>('ASC')
  const [filterKey, setFilterkey] = useState<boolean | ReviewStatus>(true)

  const sortedArray = useSort({
    array: allActivities.data,
    sortMethod: method,
    sortKey: 'name',
    disabled: false,
  })

  const filteredArray = useFilter({
    array: sortedArray,
    filterFn: (v) => true,
    disabled: true,
  })

  return (
    <div>
      <div className='flex flex-col gap-4'>
        {filteredArray?.map((v) => (
          <div className='ring-2' key={v.id}>
            <h1>{v?.name}</h1>
            <p>STATUS: {v.reviewStatus}</p>
          </div>
        ))}
        <button onClick={() => setMethod('ASC')}>ASC</button>
        <button onClick={() => setMethod('DESC')}>DEC</button>
        <button onClick={() => setFilterkey('NEW')}>FILTER</button>
        <button onClick={() => setFilterkey(true)}>CLEAR FILTER</button>
      </div>
    </div>
  )
}

export default Experiment
