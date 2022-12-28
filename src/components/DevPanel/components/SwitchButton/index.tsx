import { useState } from 'react'
import { SwitchButtonProps } from '../../types'

const SwitchButton = (props: SwitchButtonProps) => {
  const { onChange, defaultValue } = props
  const [isOn, setIsOn] = useState(defaultValue || false)

  const containerClassName = `flex h-10 bg-black w-16 rounded-full p-1 duration-200 ease-in-out ${
    isOn && 'justify-end bg-gh-green'
  }`
  const knobClassName = `aspect-square h-full bg-white rounded-full`

  const clickHandle = () => {
    setIsOn((prev) => !prev)

    if (!onChange) return

    onChange(!isOn)
  }

  return (
    <div className={containerClassName} onClick={clickHandle}>
      <button className={knobClassName}></button>
    </div>
  )
}

export default SwitchButton
