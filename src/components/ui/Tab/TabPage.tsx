import { Children } from 'react'

const TabPage = ({
  tabIndex = 0,
  children,
  disabled = false,
}: {
  tabIndex: number
  children?: JSX.Element | JSX.Element[]
  disabled?: boolean
}) => {
  if (disabled) return children

  const childrenArray = Children.toArray(children)

  return childrenArray.at(tabIndex)
}

export default TabPage
