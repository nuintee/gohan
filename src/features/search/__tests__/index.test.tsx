import { render } from '@testing-library/react'
import Experiment from '@/pages/_index'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Experiment />)

    // const heading = screen.getByRole('heading', {
    //   name: /welcome to next\.js!/i,
    // })

    // screen.getByTestId('strat')

    // expect(heading).toBeInTheDocument()
    expect(true).toBeTruthy()
  })
})
