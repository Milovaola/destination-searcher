import React from 'react'
import { Center, Spinner as ChakraSpinner } from '@chakra-ui/react'
import { SpinnerProps } from '@chakra-ui/spinner/dist/spinner'

export const Spinner: React.FC<SpinnerProps> = (props) => (
  <Center>
    <ChakraSpinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="md"
      {...props}
    />
  </Center>
)

Spinner.displayName = 'Spinner'
