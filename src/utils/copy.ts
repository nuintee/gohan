import useToast from '@/libs/react-toastify'

export async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    useToast.success('コピー完了')
  } catch (error) {
    useToast.error('コピーに失敗しました。')
  }
}
