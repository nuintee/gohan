import { Button } from '@/components/ui'
import { TRPCClientErrorBase } from '@trpc/client'
import { DefaultErrorShape } from '@trpc/server'
import { useRouter } from 'next/router'

// constants
import { ROUTES } from '@/constants/routes'

const ErrorFallBack = ({
  error,
  resetErrorBoundary,
}: {
  error: TRPCClientErrorBase<DefaultErrorShape> | Error
  resetErrorBoundary?: (_args: unknown) => void
}) => {
  const router = useRouter()

  return (
    <div className='h-screen w-screen flex flex-col gap-4 items-center justify-center'>
      <h1>エラー</h1>
      <p>{error.message}</p>
      {resetErrorBoundary && (
        <button className='underline' onClick={resetErrorBoundary}>
          リトライ
        </button>
      )}
      <div>
        <Button text='ホームへ戻る' onClick={() => router.push(ROUTES.HOME.path)} />
      </div>
    </div>
  )
}

export default ErrorFallBack
