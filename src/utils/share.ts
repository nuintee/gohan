import useToast from '@/libs/react-toastify'

export async function share(data: ShareData) {
  if (!navigator.canShare) {
    useToast.error("Your browser doesn't support the Web Share API.")
  } else if (navigator.canShare(data)) {
    await navigator.share(data)
  } else {
    useToast.error("Your browser doesn't support the Web Share API.")
  }
}
