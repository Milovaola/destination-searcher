import React from 'react'
import {
  Text,
  Heading,
  Card,
  CardBody,
} from '@chakra-ui/react'
import { DestinationEntity } from '../../interfaces'
import { NearbyDestination } from './nearby-destination'
import { Details } from './details'

interface CardProps {
  card: DestinationEntity;
  nearbyDestinations: DestinationEntity[]
}

export const DestinationCard: React.FC<CardProps> = ({ card, nearbyDestinations }) =>
  <Card>
    <CardBody>
      <Heading size='md' pb={4} textTransform='uppercase'>
        {card.name}
      </Heading>
      <Details {...card} />
      <Text as='b' fontSize='md'>
        Nearby destinations:
      </Text>
      {nearbyDestinations.map((item, idx) => <NearbyDestination key={idx} {...item} />,
      )}
    </CardBody>
  </Card>


DestinationCard.displayName = 'DestinationCard'
