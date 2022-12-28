import { useToast } from '@/hooks/context'
import copy from '@/utils/copy'

const Indicator = (props: IndicatorProps) => {
  const { label, value, supportText, allowCopy } = props
  const { manageToast } = useToast()

  const copyHandle = (text: string) => {
    copy(
      text,
      (str) => {
        manageToast({
          isOpen: true,
          main: 'Copied!',
          sub: str,
          mode: 'success',
        })
      },
      (error) => {
        manageToast({
          isOpen: true,
          main: 'Copy Failed',
          sub: error.message,
          mode: 'error',
        })
      },
    )
  }
}

export default Indicator
