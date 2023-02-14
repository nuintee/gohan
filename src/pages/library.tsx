import Header from '@/components/ui/Header'
import AcitvityButton from '@/features/activities/components/ActivityButton'
import ActivityPanel from '@/features/activities/components/ActivityPanel'
import MapBox from '@/features/mapbox/components/MapBox'

const LibraryPage = () => {
  return (
    <div className='flex flex-col h-full w-full'>
      <Header />
      <main className='relative flex-1 bg-gh-l-gray'>
        <section className='absolute top-4 right-4'>
          <AcitvityButton isLocked={false} />
        </section>
        <ActivityPanel />
      </main>
    </div>
  )
}

export default LibraryPage
