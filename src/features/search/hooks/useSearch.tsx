import { useState } from 'react'

const useSearch = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  const manageSearchModal = (isOpen: boolean) => {
    setIsSearchModalOpen(isOpen)
  }

  return {
    isSearchModalOpen,
    manageSearchModal,
    setIsSearchModalOpenDangerously: setIsSearchModalOpen,
  }
}

export default useSearch
