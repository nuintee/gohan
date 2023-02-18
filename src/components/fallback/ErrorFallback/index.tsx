import { TRPCClientErrorBase } from '@trpc/client'
import { DefaultErrorShape } from '@trpc/server'

const ErrorFallBack = ({ error }: { error: TRPCClientErrorBase<DefaultErrorShape> | Error }) => {
  return (
    <div className='h-screen w-screen'>
      <h1>エラー</h1>
      <p>{error.message}</p>
    </div>
  )
}

export default ErrorFallBack
