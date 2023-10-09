import React from 'react'
import { DestinationEntity } from '../../interfaces'
import { Text, useDisclosure, Collapse, Box, ListItem, UnorderedList, Link } from '@chakra-ui/react'
import { useDestinationList } from '../../fake-api'
import { getNearbyDestinations } from '../../utils'
import { Details } from './details'

export const NearbyDestination: React.FC<DestinationEntity> = (destination) => {

  const { isOpen, onToggle } = useDisclosure()

  const { data = [] } = useDestinationList()

  const list = getNearbyDestinations(data, destination)

  return (
    <>
      <Link _active={{ color: 'blue.300' }} display='block' fontSize='md' onClick={onToggle}>
        {destination.name}
      </Link>
      <Collapse in={isOpen} animateOpacity>
        <Box
          p='2'
          color='white'
          mt='4'
          bg='blue.300'
          rounded='md'
          shadow='md'
          mb={4}
        >
          <Details {...destination} />
          <Text as='b' fontSize='md'>
            Nearby destinations:
          </Text>
          <UnorderedList>
            {list.map((item, idx) => (
                <ListItem fontSize='md' key={idx}>
                  {item.name}
                </ListItem>
              ),
            )}
          </UnorderedList>
        </Box>
      </Collapse>
    </>
  )
}

NearbyDestination.displayName = 'NearbyDestination'
