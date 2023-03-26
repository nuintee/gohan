import { Button, SuspenseImage, Texts } from '@/components/ui'
import { TRPCClientErrorBase } from '@trpc/client'
import { DefaultErrorShape } from '@trpc/server'
import { useRouter } from 'next/router'

// constants
import { ROUTES } from '@/constants/routes'

const ErrorFallBack = ({
  error,
  resetErrorBoundary,
  fullScreen = true,
  backToHome = true,
}: {
  error: TRPCClientErrorBase<DefaultErrorShape> | Error | null
  resetErrorBoundary?: (_args: unknown) => void
  fullScreen?: boolean
  backToHome?: boolean
}) => {
  const router = useRouter()

  const screenSize = fullScreen ? 'h-screen w-screen' : 'h-full w-full'

  return (
    <div
      className={`${screenSize} flex flex-col gap-10 items-center justify-center`}
      data-testid='error__fallback'
    >
      <Texts main='エラー' sub={error?.message} textAlign='center' size='large' />
      <SuspenseImage
        src='/images/error_image.svg'
        disabled
        height={250}
        width={250}
        draggable={false}
      />
      {Boolean(backToHome) && (
        <div>
          <Button text='ホームへ戻る' onClick={() => router.push(ROUTES.HOME.path)} />
        </div>
      )}
      {resetErrorBoundary && (
        <button className='underline text-gh-gra' onClick={resetErrorBoundary}>
          リトライ
        </button>
      )}
    </div>
  )
}

export default ErrorFallBack
