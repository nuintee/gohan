import { useState } from 'react'

export function useTab({ disabled = false }: { disabled?: boolean }) {
  const [tabIndex, setTabIndex] = useState(0)

  function onSelect(_index: number) {
    setTabIndex(_index)
  }

  return { tabIndex, onSelect, disabled }
}
