import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import CopyButton from '.'

describe('<CopyButton />', () => {
  it('21180: renders properly', () => {
    const button = render(<CopyButton />)

    expect(button.getByTestId('copy__button')).toBeInTheDocument()
  })
})
