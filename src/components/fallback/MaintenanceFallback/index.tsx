import { Texts } from '@/components/ui'

const MaintenanceFallback = () => {
  return (
    <div
      className={`h-screen w-screen flex flex-col gap-10 items-center justify-center`}
      data-testid='error__fallback'
    >
      <Texts
        main='現在メンテナンス中です'
        sub={'ご迷惑をお掛けしております。'}
        textAlign='center'
        size='large'
      />
    </div>
  )
}

export default MaintenanceFallback
