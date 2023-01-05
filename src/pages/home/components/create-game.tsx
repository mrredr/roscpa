import {
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack
} from '@chakra-ui/react'
import { createGame } from 'api/game'
import { PlayerContext } from 'app/App'
import { useContext, useState } from 'react'

export const CreateGame = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [bestof, setBestof] = useState(3)
  const player = useContext(PlayerContext)
  const handleCreateGame = () => {
    if (player) {
      createGame({ player, bestof }).finally(() => {
        setIsOpen(false)
      })
    }
  }

  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <PopoverTrigger>
        <Button colorScheme="orange" onClick={() => setIsOpen(true)}>
          Create new game
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent p={5}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Stack direction="row" p={4} alignItems="center">
              <div>Best of</div>
              <NumberInput
                defaultValue={3}
                min={1}
                maxW={24}
                value={bestof}
                onChange={(value) => setBestof(Number(value))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <div>games</div>
            </Stack>
            <div className="flex flex-row justify-center">
              <Button onClick={handleCreateGame}>Create</Button>
            </div>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
