import { QueryClient, QueryClientProvider as QCP } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export const QueryClientProvider = ({ children }) => <QCP client={queryClient}>{children}</QCP>
