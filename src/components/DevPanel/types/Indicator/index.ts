type IndicatorProps = {
  label: string
  value?: string | number | null
  supportText?: string
  allowCopy: boolean
  onSuccessCopy?: Function
  onErrorCopy?: Function
  children?: React.ReactChildren
}

export default IndicatorProps
