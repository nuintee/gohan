import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import BasicInfoModal from '../components/BasicInfoModal'

import { BASIC_INFO_KEYS } from '../constants'

describe('<BasicInfoModal />', () => {
  it('4fff8: do not show all fields when invalid', () => {
    const page = render(<BasicInfoModal isOpen={true} data={{}} />)
    const main = page.getByTestId('basic_info__modal_main')
    expect(main.innerHTML).toBe('') // not a single field gets render
  })
  it('34661: show all fields when valid', () => {
    const page = render(
      <BasicInfoModal
        isOpen={true}
        data={{
          name: 'TEST_NAME',
          rating: 10,
          vicinity: 'TEST_VICINITY',
          website: 'TEST_WEBSITE',
          international_phone_number: 'TEST_PHONE_NUMBER',
          current_opening_hours: {},
        }}
      />,
    )

    BASIC_INFO_KEYS.forEach((info_key) => {
      expect(page.getByTestId(`basic_info__modal_key_${info_key}`))
    })
  })
})
