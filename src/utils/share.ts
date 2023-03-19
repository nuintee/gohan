import useToast from '@/libs/react-toastify'

const ERROR_TEXT = 'お使いのブラウザは共有機能に対応しておりません。'

export async function share(data: ShareData) {
  if (!navigator.canShare) {
    useToast.error(ERROR_TEXT)
  } else if (navigator.canShare(data)) {
    await navigator.share(data)
  } else {
    useToast.error(ERROR_TEXT)
  }
}
