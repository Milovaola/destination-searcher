import React, { useEffect, useCallback } from 'react'
import {
  Input,
  Popover,
  PopoverBody,
  PopoverTrigger,
  useDisclosure,
  PopoverContent,
  Text,
  Divider,
  HTMLChakraProps,
  Box,
} from '@chakra-ui/react'
import { InputProps } from '@chakra-ui/input/dist/input'
import { Spinner } from '../spinner'
import { DestinationEntity, Option, ServerError } from '../../interfaces'
import { useDebounce } from '@uidotdev/usehooks'
import { useQuery } from 'react-query'
import { getDestinations } from '../../fake-api'

interface SelectWithOptionsProps
  extends Pick<InputProps, 'placeholder'>,
    HTMLChakraProps<'input'> {
  value: string
  onSelectOption: (option: Option<DestinationEntity>) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onReset: () => void
}

export const SelectWithOptions: React.FC<SelectWithOptionsProps> = ({
  placeholder,
  onChange,
  value,
  onSelectOption,
  onReset,
  ...rest
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const initialFocusRef = React.useRef<HTMLInputElement>(null)

  /* This state variable is used to track whether the change in input was initiated by a user action. */
  const [userInitiated, setUserInitiated] = React.useState(false)

  const debouncedValue = useDebounce(value, 500)

  /** Get a list of destination points depending on the value entered by the user. */
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<DestinationEntity[], ServerError, Option<DestinationEntity>[]>({
    queryKey: ['destinations', debouncedValue],
    queryFn: () => getDestinations(debouncedValue),
    enabled: Boolean(debouncedValue) && userInitiated,
    retry: 2,
    select: (data) =>
      data.map((item) => ({ value: item.id, label: item.name, item })),
  })

  /* If an error occurs while the Popover is open, the Popover will close and reset the data for the previously selected destination. */
  useEffect(() => {
    if (isError && isOpen) {
      onReset()
      onClose()
    }
  }, [isOpen, isError, onClose, onReset])

  /* This effect opens or closes the Popover based on the presence of data and loading state. */
  useEffect(() => {
    if ((data && data.length > 0 && userInitiated) || isLoading) {
      onOpen()
    } else {
      onClose()
    }
  }, [data, isLoading, onClose, onOpen, userInitiated])

  /* This callback sets `userInitiated` state to true and triggers the parent's `onChange`. */
  const handleChange = useCallback(
    (event) => {
      setUserInitiated(true)
      onChange(event)
    },
    [onChange]
  )

  /* This callback sets `userInitiated` state to false and triggers the parent's `onSelectOption`, and closes the Popover.. */
  const handleSelectOption = useCallback(
    (option: Option<DestinationEntity>) => {
      setUserInitiated(false)
      onSelectOption(option)
      onClose()
    },
    [setUserInitiated, onSelectOption, onClose]
  )

  return (
    <Box {...rest}>
      <Popover
        matchWidth
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialFocusRef}
        returnFocusOnClose
      >
        <PopoverTrigger>
          <Input
            ref={initialFocusRef}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
          />
        </PopoverTrigger>
        {isError && Boolean(error.message) && (
          <Text mt={2} color="red.600">
            {error.message}
          </Text>
        )}
        <PopoverContent minH={'60px'} width={'100%'}>
          <PopoverBody>
            {isLoading && <Spinner />}
            {!isLoading && data.length > 0 && (
              <Box>
                {data.map((option, index) => (
                  <React.Fragment key={index}>
                    <Box
                      as={'button'}
                      width={'100%'}
                      textAlign={'left'}
                      _hover={{ color: 'blue.300' }}
                      cursor="pointer"
                      py={3}
                      px={1}
                      onClick={() => handleSelectOption(option)}
                    >
                      {option.label}
                    </Box>
                    <Divider />
                  </React.Fragment>
                ))}
              </Box>
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}

SelectWithOptions.displayName = 'SelectWithOptions'
