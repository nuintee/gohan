import Header from '@/components/ui/Header'
import { useRouter } from 'next/router'

const DetailsPage = ({ data }) => {
  const router = useRouter()
  const { place_id } = router.query

  return (
    <div className='flex flex-col h-screen w-screen'>
      <Header />
      <div className='flex flex-1 bg-red-200'>
        <div className={`bg-red-300 h-[10rem] w-full`}>{/* Cover */}</div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      data: query.place_id * 2,
    }, // will be passed to the page component as props
  }
}

export default DetailsPage
