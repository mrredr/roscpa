import { Card, CardBody, Heading, Text } from '@chakra-ui/react'
import { DocumentData } from 'firebase/firestore'

type Game = {
  bestof: number
  player1: {
    ref: string
    nickname: string
  }
  player2?: {
    ref: string
    nickname: string
  }
  status: string
  log: string
}

export const GameItem = ({ gameData }: { gameData: DocumentData }) => {
  const game: Game = gameData.data()

  return (
    <Card className="!bg-white">
      <CardBody>
        <Heading size="xs">
          {game.player1?.nickname} VS{' '}
          {game.player2?.nickname ?? '*waiting for opponent*'}
        </Heading>
        <Text>Game </Text>
      </CardBody>
    </Card>
  )
}
