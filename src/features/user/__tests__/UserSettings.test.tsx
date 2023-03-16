import '@testing-library/jest-dom'
import { setUpWrapper } from '@/config/jest/wrapper'
import { render } from '@testing-library/react'
import UserProfileModal from '../components/UserProfileModal'
import { modalState } from '@/stores/modals'

const wrapper = setUpWrapper({
  isAuthed: true,
  initializeRecoilState: ({ set }) => {
    set(modalState, [{ key: 'usersettings', payload: {} }])
  },
})

describe('<UserSettings />', () => {
  it('0ce2f: renders name,email,registered_at properly when authed', async () => {
    const page = render(<UserProfileModal />, {
      wrapper,
    })

    page.debug()

    expect(page.getByText('ユーザー情報')).toBeInTheDocument()
  })
})
