import { IS_DEVMODE } from '@/config/env'
import getDetailsAPI from '@/features/restaurants/utils/getDetailsAPI'
import { MainLayout } from '@/layouts/layout'
import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'

const Experiment = () => {
  const handleDetails = async () => {
    const r = await getDetailsAPI({ place_id: '' })
    console.log(r)
  }

  return (
    <div>
      <h1>1</h1>
      <button onClick={handleDetails}>Fetch details</button>
    </div>
  )
}

Experiment.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  const q = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const data = await q.json()
  console.log(data)
  return {
    props: {},
  }
}

export default Experiment
