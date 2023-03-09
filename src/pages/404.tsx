import ErrorFallBack from '@/components/fallback/ErrorFallback'

const NotFound = () => {
  return <ErrorFallBack error={new Error('ページが見つかりませんでした。')} />
}

export default NotFound
