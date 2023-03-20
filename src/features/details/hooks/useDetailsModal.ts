import { useState } from 'react'
import { DETAILS_MODAL_KEYS } from '../constants'

function useDetailsModal() {
  const [detailsModal, setDetailsModal] = useState<typeof DETAILS_MODAL_KEYS[number] | ''>('') //ID: BASIC, REVIEW, IMAGE

  function clearLocalModal() {
    setDetailsModal('')
  }

  function checkIsOpen(modalId: typeof DETAILS_MODAL_KEYS[number]) {
    return detailsModal === modalId
  }

  function openLocalModal(modalId: typeof DETAILS_MODAL_KEYS[number]) {
    return setDetailsModal(modalId)
  }

  return { clearLocalModal, checkIsOpen, openLocalModal }
}

export default useDetailsModal
