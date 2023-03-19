import useToast from '@/libs/react-toastify'
import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import CopyButton from '.'

const mockedErrorToast = jest.spyOn(useToast, 'error')
const mockedSuccessToast = jest.spyOn(useToast, 'success')

const mockClipboard = {
  writeText: jest.fn(),
}
// @ts-ignore
global.navigator.clipboard = mockClipboard

describe('<CopyButton />', () => {
  it('21180: renders properly', () => {
    const button = render(<CopyButton />)

    expect(button.getByTestId('copy__button')).toBeInTheDocument()
  })
  it('f90d0: show error modal when copy failed', async () => {
    mockClipboard.writeText.mockRejectedValueOnce(() => new Error('Copy Error'))
    const button = render(<CopyButton />)

    const container = button.getByTestId('copy__button')
    fireEvent.click(container)

    await waitFor(() => {
      expect(mockedErrorToast).toBeCalledWith('コピーに失敗しました。')
    })
  })
  it('52f8c: show success modal when copy successes', async () => {
    const COPY_TEXT = '[TEST_COPY_TEXT]'
    mockClipboard.writeText.mockReturnValue(COPY_TEXT)
    const button = render(<CopyButton copyValue={COPY_TEXT} />)

    const container = button.getByTestId('copy__button')
    fireEvent.click(container)

    await waitFor(() => {
      expect(mockClipboard.writeText).toBeCalledWith(COPY_TEXT)
      expect(mockedSuccessToast).toBeCalledWith('コピー完了')
    })
  })
})
