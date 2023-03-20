import '@testing-library/jest-dom'

// page
import LibraryPage from '@/pages/library'
import { render } from '@testing-library/react'
import { setUpWrapper } from '@/config/jest/wrapper'

const authedWrapper = setUpWrapper({ isAuthed: true })
const unauthedWrapper = setUpWrapper({ isAuthed: false })

jest.mock('next/router', () => require('next-router-mock'))

describe('/library', () => {
  it('13bff: renders Library page without Error when authed', () => {
    const page = render(<LibraryPage />, { wrapper: authedWrapper })
    const viewport = page.getByTestId('library__page')
    expect(viewport).toBeInTheDocument()
  })

  it('e6eb4: renders Auth Fallback when not authed', () => {
    const page = render(<LibraryPage />, { wrapper: unauthedWrapper })
    const viewport = page.getByTestId('auth__fallback')
    expect(viewport).toBeInTheDocument()
  })

  it('f8767: open ActivityPanel on first render', () => {
    const page = render(<LibraryPage />, { wrapper: authedWrapper })
    const activityPanel = page.getByTestId('activity__panel_is_true')
    expect(activityPanel).toBeInTheDocument()
  })
})
