import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import 'whatwg-fetch'

// data
import { user } from '@/data/user'

// hooks
import useGetUser from '../hooks/useGetUser'
import useUpdateUser from '../hooks/useUpdateUser'
import useToast from '@/libs/react-toastify'
import useAddUser from '../hooks/useAddUser'
import { act } from 'react-dom/test-utils'
import { BASE_URL } from '@/config/env'
import { AddUserProps } from '../schema'
import axios from '@/libs/axios'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
  },
})

const wrapper = ({ children }) => (
  <SessionProvider
    session={{
      expires: '',
      user,
    }}
  >
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </SessionProvider>
)

const addTestUser = async (payload: AddUserProps) => {
  const query = await fetch(`${BASE_URL}/api/v1/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await query.json()
  return data
}

const removeTestUser = async (userId: string) => {
  const query = await fetch(`${BASE_URL}/api/v1/user/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await query.json()
  return data
}

beforeAll(async () => {
  await addTestUser({
    name: user.name as string,
    email: user.email as string,
    id: user.id as string,
  })
})

afterAll(async () => {
  await removeTestUser(user.id)
})

describe('useUserQuery', () => {
  test('getUser', async () => {
    const { result } = renderHook(() => useGetUser({ user }), { wrapper })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toMatchObject(user)
  })

  test('updateUser', async () => {
    const UPDATE_NAME = 'UPDATED_USER_NAME'

    const { result } = renderHook(() => useUpdateUser(), { wrapper })

    await result.current.mutateAsync({
      name: UPDATE_NAME,
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data.name).toBe(UPDATE_NAME)
  })
})
