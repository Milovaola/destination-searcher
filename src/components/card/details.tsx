import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { DestinationEntity } from '../../interfaces'

export const Details: React.FC<DestinationEntity> = ({ description, currency, climate }) => (
  <Box>
    <Text as='i' fontSize='md'>
      {description}
    </Text>
    <Box py='6'>
      <Flex gap={2}>
        <Text as='b' fontSize='md'>
          Climate:
        </Text>
        <Text fontSize='md'>
          {climate}
        </Text>
      </Flex>
      <Flex gap={2}>
        <Text as='b' fontSize='md'>
          Currency:
        </Text>
        <Text fontSize='md'>
          {currency}
        </Text>
      </Flex>
    </Box>
  </Box>
)

Details.displayName = 'Details'
