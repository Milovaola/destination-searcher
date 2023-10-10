import React, { useCallback, useMemo, useState } from 'react'
import { Text, Heading, Card, CardBody, Box, Flex } from '@chakra-ui/react'
import { DestinationEntity } from '../../interfaces'
import { useDestinationList } from '../../fake-api'
import { getNearbyDestinations } from '../../utils'
import { Spinner } from '../spinner'

interface DestinationCardProps {
  destination: DestinationEntity
  onChangeDestination: (
    event: React.MouseEvent<HTMLDivElement>,
    destination: DestinationEntity
  ) => void
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onChangeDestination,
}) => {
  const { description, climate, currency, name } = destination

  const { data = [] } = useDestinationList()

  const [showLoader, setShowLoader] = useState(false)

  /** Get a list of nearby destinations. */
  const list = useMemo(
    () => getNearbyDestinations(data, destination),
    [data, destination]
  )

  /** This callback use for change of the destination. */
  const handleChangeDestination = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, item: DestinationEntity) => {
      setShowLoader(true)
      setTimeout(() => {
        onChangeDestination(event, item)

        setShowLoader(false)
      }, 1000)
    },
    [setShowLoader, onChangeDestination]
  )

  return (
    <Card>
      <CardBody>
        <Heading size="md" pb={4} textTransform="uppercase">
          {name}
        </Heading>
        <Box>
          <Text as="i" fontSize="md">
            {description}
          </Text>
          <Box py="6">
            <Flex gap={2}>
              <Text as="b" fontSize="md">
                Climate:
              </Text>
              <Text fontSize="md">{climate}</Text>
            </Flex>
            <Flex gap={2}>
              <Text as="b" fontSize="md">
                Currency:
              </Text>
              <Text fontSize="md">{currency}</Text>
            </Flex>
          </Box>
        </Box>
        <Text as="b" fontSize="md">
          Nearby destinations:
        </Text>
        <Box mt={2}>
          {showLoader ? (
            <Spinner />
          ) : (
            list.map((item, idx) => (
              <Box
                as="button"
                display={'block'}
                key={idx}
                _hover={{ color: 'blue.300' }}
                _active={{ color: 'blue.600' }}
                fontSize="md"
                p={1}
                onClick={(e) => handleChangeDestination(e, item)}
              >
                {item.name}
              </Box>
            ))
          )}
        </Box>
      </CardBody>
    </Card>
  )
}

DestinationCard.displayName = 'DestinationCard'
