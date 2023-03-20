import '@testing-library/jest-dom'
import { setUpWrapper } from '@/config/jest/wrapper'
import { fireEvent, render, waitFor } from '@testing-library/react'
import UserDeletionModal from '../components/UserDeletionModal'
import { modalState } from '@/stores/modals'
import { MockContext, createMockContext } from '@/mocks/prisma/context'
import { user } from '@/data/user'

const wrapper = setUpWrapper({
  isAuthed: true,
  initializeRecoilState: ({ set }) => {
    set(modalState, [{ key: 'deactivation', payload: {} }])
  },
})

let mockCtx: MockContext

beforeAll(async () => {
  mockCtx = createMockContext()

  await mockCtx.prisma.user.create({
    data: user,
  })
})

describe('<UserDeletion />', () => {
  it('29f53: renders component', async () => {
    const page = render(<UserDeletionModal />, {
      wrapper,
    })

    // rendering
    const container = page.getByTestId('cancelation__modal')
    expect(container).toBeInTheDocument()
  })
  it('2c1a1: deactivation button is disabled when checkbox is inactive', async () => {
    const page = render(<UserDeletionModal />, {
      wrapper,
    })

    const deactivationButton = page.getByTestId('deactivation_action__button')
    const deactivationCheckBox = page.getByTestId('deactivation_confirmation__checkbox')
    expect(deactivationButton).toBeDisabled()
    expect(deactivationCheckBox).not.toBeChecked()
  })
  it('91f80: deactivation button is activated when checkbox is checked', async () => {
    const page = render(<UserDeletionModal />, {
      wrapper,
    })

    const deactivationButton = page.getByTestId('deactivation_action__button')
    const deactivationCheckBox = page.getByTestId('deactivation_confirmation__checkbox')

    fireEvent.click(deactivationCheckBox)

    await waitFor(() => {
      expect(deactivationCheckBox).toBeChecked()
    })

    expect(deactivationButton).not.toBeDisabled()
  })
})
