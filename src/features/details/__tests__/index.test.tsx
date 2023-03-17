import { wrapper } from '@/config/jest/wrapper'
import { details } from '@/data/details'
import DetailsPage from '@/pages/details/[place_id]'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

jest.mock('next/router', () => require('next-router-mock'))

jest.mock('@/features/activities/hooks/useGetActivity', () =>
  jest.fn().mockReturnValue({ isLoading: false }),
)

jest.mock('@/features/details/hooks/useDetails', () =>
  jest.fn().mockReturnValue({ isLoading: false, data: details.result('') }),
)

describe('/details', () => {
  it('10a2c: not showing add review and delete from library', async () => {
    const page = render(<DetailsPage id={''} />, { wrapper })

    page.debug()
  })
})
