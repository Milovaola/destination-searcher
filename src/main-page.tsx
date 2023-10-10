import React, { useCallback, useEffect, useState } from 'react'
import { DestinationEntity, Option } from './interfaces'
import { useDestinationList } from './fake-api'
import { Box, Center, Heading } from '@chakra-ui/react'
import { DestinationCard, SelectWithOptions, Spinner } from './components'
import { useSearchParams } from 'react-router-dom'

export const SearchDestinationPage: React.FC = () => {
  /** State to manage URL search parameters. */
  const [searchParams, setSearchParams] = useSearchParams()

  /** State to manage the list of all destinations and its loading status. */
  const { data, isLoading } = useDestinationList(
    Boolean(searchParams.get('id'))
  )

  /** State to manage the value of the combobox. */
  const [value, setValue] = React.useState<string>('')

  /** State to manage card of selected destination. */
  const [destinationEntity, setDestinationEntity] =
    useState<DestinationEntity | null>(null)

  /** Effect to set the value of the combobox and destination card when the URL search parameters change. */
  useEffect(() => {
    if (searchParams.get('id')) {
      const destination = data?.find(
        (item) => item.id.toString() === searchParams.get('id')
      )
      if (destination) {
        setValue(destination.name)
        setDestinationEntity(destination)
      }
    }
  }, [data, searchParams])

  /** Reset URL search parameters and selected destination info. */
  const handleResetData = () => {
    setSearchParams({})
    setDestinationEntity(null)
  }

  /** Handle change of the combobox input. */
  /** If the input is empty, reset the URL search parameters and selected destination info. */
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)

    if (!event.target.value) {
      handleResetData()
    }
  }

  /** Handle select of the combobox option. */
  const handleSelectOption = useCallback(
    ({ label, item }: Option<DestinationEntity>) => {
      setValue(label)
      setSearchParams({ id: item.id.toString() })
      setDestinationEntity(item)
    },
    [setValue, setSearchParams, setDestinationEntity]
  )

  /** Handle change of the destination card. */
  const handleChangeDestination = useCallback(
    (_: React.MouseEvent<HTMLDivElement>, destination: DestinationEntity) => {
      setValue(destination.name)
      setSearchParams({ id: destination.id.toString() })
      setDestinationEntity(destination)
    },
    [setValue, setSearchParams, setDestinationEntity]
  )

  return (
    <Center maxW="100%" minH="100vh">
      <Box my={10} maxW={900} width={'100%'} minH="100vh">
        <Heading as="h3" size="xl" color="blue.300" mb={4}>
          Find your perfect destination
        </Heading>
        {isLoading && (
          <Spinner size="xl" position={'absolute'} top={'50%'} left={'50%'} />
        )}
        <SelectWithOptions
          placeholder="Enter destination"
          value={value}
          onChange={handleChangeInput}
          onSelectOption={handleSelectOption}
          mb={4}
          onReset={handleResetData}
        />
        {Boolean(destinationEntity) && (
          <DestinationCard
            destination={destinationEntity}
            onChangeDestination={handleChangeDestination}
          />
        )}
      </Box>
    </Center>
  )
}

SearchDestinationPage.displayName = 'SearchDestinationPage'
