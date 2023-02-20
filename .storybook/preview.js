import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css'

import { decorators as decoratorsConfig } from '@/config/storybook/decorators'
import { WithNextRouter } from 'storybook-addon-next-router/dist/decorators'
import { RouterContext } from 'next/dist/shared/lib/router-context'

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}

export const decorators = [...decoratorsConfig, WithNextRouter]
