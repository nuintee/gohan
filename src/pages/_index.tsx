import { DetailsSummary } from '@/components/ui'
import useGetUserActivities from '@/features/activities/hooks/useGetUserActivities'
import { ActivityResolved } from '@/features/activities/types'
import { useSendReports } from '@/features/report/hooks/useSendReports'
import useRestaurants from '@/features/restaurants/hooks/useRestaurants'
import DropDownLayout from '@/layouts/DropDownLayout'
import { useState } from 'react'

import { useSort } from '@/hooks/sort'
import { useFilter } from '@/hooks/filter'

const Experiment = () => {
  const allActivities = useGetUserActivities()

  const [method, setMethod] = useState<'ASC' | 'DEC'>('ASC')
  const [filterKey, setFilterkey] = useState('')

  const sortedArray = useSort({
    array: allActivities.data,
    sortMethod: method,
    sortKey: 'name',
  })

  const filteredArray = useFilter({
    array: sortedArray,
    filterFn: (v) => v.reviewStatus !== filterKey,
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
        <button onClick={() => setMethod('DEC')}>DEC</button>
        <button onClick={() => setFilterkey('NEW')}>FILTER</button>
        <button onClick={() => setFilterkey('')}>CLEAR FILTER</button>
      </div>
    </div>
  )
}

export default Experiment
