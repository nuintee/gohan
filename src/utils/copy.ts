import useToast from '@/libs/react-toastify'

export async function copy(data: ClipboardItems) {
  try {
    await navigator.clipboard.write(data)
    useToast.success('コピー完了')
  } catch (error) {
    useToast.error('コピーに失敗しました。')
  }
}
