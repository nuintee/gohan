import Header from '@/components/ui/Header'
import { useRouter } from 'next/router'

const DetailsPage = ({ data }) => {
  const router = useRouter()
  const { place_id } = router.query

  return (
    <div>
      <Header />
      <div className='flex flex-1'></div>
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
