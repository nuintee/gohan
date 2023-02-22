// cancelable task

import { trpc } from '@/libs/trpc'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'

const useAsyncTaks = ({ canceled = false }: { canceled?: boolean }) => {
  return trpc.getExperiment.useQuery(null, {
    retry: false,
    trpc: {
      abortOnUnmount: true,
    },
  })
}

const _INDEX = () => {
  const [canceled, setCanceled] = useState(false)
  const router = useRouter()
  const client = useQueryClient()
  const ctx = trpc.useContext()

  const data = useAsyncTaks({ canceled })

  //   const secData = useAsyncTaks({})

  const handleFetch = async () => {
    const pending = await ctx.getExperiment.fetch(null)
    console.log(pending)
  }

  const cancelQuery = async () => {
    // await ctx.getExperiment.cancel()
    await client.cancelQueries()
  }

  const ui = () => {
    if (canceled) return <h1>CANCELED</h1>

    if (data.isFetching) {
      return <h1>{data.status}</h1>
    } else if (data.isError) {
      return <h1>{data.status}</h1>
    } else {
      return <h1>{data.status}</h1>
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      {/* {ui()} */}
      <button onClick={cancelQuery}>Cancel</button>
      <button onClick={handleFetch}>Fetch</button>
      <button onClick={() => router.push('/')}>Navigate</button>
    </div>
  )
}

export default _INDEX
