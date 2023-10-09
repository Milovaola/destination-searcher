import React from 'react'
import { Spinner as ChakraSpinner } from '@chakra-ui/react'

export const Spinner: React.FC = () => <ChakraSpinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
  position={'absolute'}
  top={'50%'}
  left={'50%'}
/>

Spinner.displayName = 'Spinner'
