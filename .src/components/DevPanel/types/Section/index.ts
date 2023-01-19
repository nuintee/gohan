import IndicatorProps from '../Indicator'

interface SectionProps extends IndicatorProps {
  allowReset: boolean
  disabledReset: boolean
  onReset: Function
}

export default SectionProps
