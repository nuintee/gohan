import { Children } from 'react'

const TabPage = ({
  tabIndex = 0,
  children,
  disabled = false,
}: React.PropsWithChildren<{
  tabIndex: number
  disabled?: boolean
}>) => {
  if (disabled) return children as JSX.Element

  const childrenArray = Children.toArray(children)

  return childrenArray.at(tabIndex) as JSX.Element
}

export default TabPage
