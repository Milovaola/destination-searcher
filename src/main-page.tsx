import React, { useRef } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
import { useQuery } from 'react-query'
import { DestinationEntity, ServerError } from './interfaces'
import { getDestinations, useDestinationList } from './fake-api'
import { Box, Center, Input, SimpleGrid, Text } from '@chakra-ui/react'
import { DestinationCard, Spinner } from './components'
import { getNearbyDestinations } from './utils'
import { useSearchParams } from 'react-router-dom'

export const SearchDestinationPage: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const [value, setValue] = React.useState<string>(searchParams.get('search') || '')

  const debouncedValue = useDebounce(value, 1000)

  const inputRef = useRef<HTMLInputElement>(null)

  /** Get a list of destination points depending on the value entered by the user. */
  const { data, isLoading, isError, error } = useQuery<DestinationEntity[], ServerError>({
    queryKey: ['destinations', debouncedValue],
    queryFn: () => getDestinations(debouncedValue),
    enabled: Boolean(debouncedValue),
    retry: 2,
  })

  const { data: destinationList = [], isLoading: isLoadingDestinationList } = useDestinationList()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)

    if (event.target.value) {
      setSearchParams({ search: event.target.value })
    } else {
      setSearchParams({})
    }
  }

  return (
    <Center maxW='100%' minH='100vh'>
      {(isLoading || isLoadingDestinationList) && <Spinner />}
      <Box my={10} maxW={900} width={'100%'} minH='100vh'>
        <Input ref={inputRef} value={value} onChange={handleChange} size='md'
               placeholder='Enter destination' />
        {isError && error && <Text mt={2} color='red.600'>{error.message}</Text>}
        {data && data.length > 0 && (
          <SimpleGrid py={6} spacing={6}>
            {data.map((item) => {
              const list = getNearbyDestinations(destinationList, item)

              return <DestinationCard key={item.id} nearbyDestinations={list} card={item} />
            })}
          </SimpleGrid>
        )}
      </Box>
    </Center>
  )
}

SearchDestinationPage.displayName = 'SearchDestinationPage'
