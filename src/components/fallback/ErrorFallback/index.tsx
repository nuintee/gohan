import { Button, SuspenseImage, Texts } from '@/components/ui'
import { TRPCClientErrorBase } from '@trpc/client'
import { DefaultErrorShape } from '@trpc/server'
import { useRouter } from 'next/router'

// constants
import { ROUTES } from '@/constants/routes'

const ErrorFallBack = ({
  error,
  resetErrorBoundary,
}: {
  error: TRPCClientErrorBase<DefaultErrorShape> | Error | null
  resetErrorBoundary?: (_args: unknown) => void
}) => {
  const router = useRouter()

  return (
    <div className='h-screen w-screen flex flex-col gap-10 items-center justify-center'>
      <Texts main='エラー' sub={error?.message} textAlign='center' size='large' />
      <SuspenseImage
        src='/images/error_image.svg'
        disabled
        height={250}
        width={250}
        draggable={false}
      />
      <div>
        <Button text='ホームへ戻る' onClick={() => router.push(ROUTES.HOME.path)} />
      </div>
      {resetErrorBoundary && (
        <button className='underline text-gh-gra' onClick={resetErrorBoundary}>
          リトライ
        </button>
      )}
    </div>
  )
}

export default ErrorFallBack
