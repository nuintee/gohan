import { useState } from 'react'

const useSearch = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  const mangaeSearchModal = (isOpen: boolean) => {
    setIsSearchModalOpen(isOpen)
  }

  return {
    isSearchModalOpen,
    mangaeSearchModal,
    setIsSearchModalOpenDangerously: setIsSearchModalOpen,
  }
}

export default useSearch
