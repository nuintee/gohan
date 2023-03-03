import { useRecoilState } from 'recoil'
import { activityPanelState } from '../stores'

const useActivityPanel = () => {
  const [activities, setActivitties] = useRecoilState(activityPanelState)

  const openPanel = () => {
    setActivitties(() => ({ isOpen: true }))
  }

  const closePanel = () => {
    setActivitties(() => ({ isOpen: false }))
  }

  const isPanelOpen = activities.isOpen

  return { openPanel, closePanel, isPanelOpen }
}

export default useActivityPanel
