import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css'

import { decorators as decoratorsConfig } from '@/config/storybook/decorators'

// import { RecoilRoot } from 'recoil'
// import { SessionProvider } from 'next-auth/react'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// const queryClient = new QueryClient()

// export const parameters = {
//   actions: { argTypesRegex: '^on[A-Z].*' },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/,
//     },
//   },
//   backgrounds: {
//     default: 'dark',
//   },
// }

export const decorators = decoratorsConfig
