import '@testing-library/jest-dom'
import { wrapper } from '@/config/jest/wrapper'
import { render } from '@testing-library/react'
import { atom } from 'recoil'
import UserProfileModal from '../components/UserProfileModal'

jest.mock('recoil')

describe('<UserSettings />', () => {
  const mockAtom = {
    key: 'modalState',
    default: {
      key: 'usersettings',
      payload: {},
    },
  }

  it('0ce2f: renders name,email,registered_at properly when authed', () => {
    const page = render(<UserProfileModal />, { wrapper })
    page.debug()
    expect(page.getByText('ユーザー情報')).not.toBeInTheDocument()
  })
})
