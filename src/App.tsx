import React from 'react'
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { SearchDestinationPage } from './main-page'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchDestinationPage />,
  },
])

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } })

export const App = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ChakraProvider>
)


