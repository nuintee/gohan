import '@testing-library/jest-dom'
import { setUpWrapper } from '@/config/jest/wrapper'
import { render } from '@testing-library/react'
import UserProfileModal from '../components/UserProfileModal'
import { modalState } from '@/stores/modals'
import { user } from '@/data/user'
import dayjs from 'dayjs'

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

    const container = page.getByTestId('userprofile__modal')
    expect(container).toBeInTheDocument()

    // check profile
    expect(page.getByText(user.email as string)).toBeInTheDocument()
    expect(page.getByText(user.name as string)).toBeInTheDocument()
    expect(
      page.getByText(dayjs(user.registered_at).format('MMMM D, YYYY h:mm A')),
    ).toBeInTheDocument()
  })

  it('02643: opens <Cancelation /> modal on cancelation button click', async () => {
    const page = render(<UserProfileModal />, {
      wrapper,
    })
  })
})
