import { Button, Card, Divider, Heading, Stack, Text } from '@chakra-ui/react'
import { firestore, Player, PlayerContext } from 'app/App'
import { addPlayerToGame, makeMoveInGame } from 'entities/game/api'
import {
  getCurrentMoveStatus,
  getGameMoves,
  getGameStat,
  Move,
  MOVE_STATUS,
  GAME_STATUS,
  fullStepName
} from 'entities/game/model'
import { Game } from 'entities/game/type'
import { getPlayerNumber } from 'entities/game/utils'
import { doc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router-dom'
import { Header } from 'shared/components/header'
import { Layout } from 'shared/components/layout'
import { Loader } from 'shared/components/loader'

export const CurrentStep = ({
  game,
  playerNumber
}: {
  game: Game
  playerNumber: 0 | 1 | 2
}) => {
  const status = getCurrentMoveStatus(game, playerNumber)

  const handleMove = (move: Move) => {
    makeMoveInGame({ game, playerNumber, move })
  }

  if (status === MOVE_STATUS.WON || status === MOVE_STATUS.LOST) {
    return <Heading size="xl">You have {status} this game</Heading>
  }

  if (status === MOVE_STATUS.DRAWN) {
    return <Heading size="xl">Nobody won this game</Heading>
  }

  if (status === MOVE_STATUS.WAIT) {
    const myLastStep = (
      game[('player' + playerNumber) as 'player1' | 'player2'] as {
        log: string
      }
    ).log.slice(-1)

    return (
      <>
        <Heading size="md">
          You have chosen {fullStepName[myLastStep as Move]}
        </Heading>
        <Heading size="md">Waiting for opponent&apos;s step</Heading>
      </>
    )
  }

  return (
    <>
      <Heading size="md">Make your next move</Heading>
      <Stack p={4} direction="row" justify="space-between">
        <Button colorScheme="red" onClick={() => handleMove('r')}>
          Rock
        </Button>
        <Button colorScheme="yellow" onClick={() => handleMove('s')}>
          Scissors
        </Button>
        <Button colorScheme="green" onClick={() => handleMove('p')}>
          Paper
        </Button>
      </Stack>
    </>
  )
}

export const GameStep = React.memo(function GameStep({
  move
}: {
  move: { title: string; result: string; idx: number }
}) {
  return (
    <Card className="!bg-white" p={4}>
      <Text fontSize="xl">{move.title}</Text>
      <Text>{move.result}</Text>
      <Text>move #{move.idx + 1}</Text>
    </Card>
  )
})

export const GamePage = () => {
  const [game, setGame] = useState<Game | null>(null)
  const { id } = useParams()
  const player = useContext(PlayerContext) as Player

  const [value, loading, error] = useDocumentData(doc(firestore, 'games/' + id))
  const [won, drawn, lost] = getGameStat(game, getPlayerNumber(game, player))

  useEffect(() => {
    if (value) setGame(value as Game)
  }, [value])

  if (loading || game === null) return <Loader />

  if (error) throw new Error(error.toString())

  return (
    <>
      <Header />
      <Layout className="!items-start">
        <Stack p={4}>
          <Heading size="lg" textAlign="center">
            {game.player1?.nickname} VS {game.player2?.nickname}
          </Heading>
          <Text fontSize="md" align="right">
            best of {game.bestof} games
          </Text>
          <Text fontSize="md" align="right">
            Won:{won} Drawn:{drawn} Lost:{lost}
          </Text>
          {game.status === GAME_STATUS.START &&
            getPlayerNumber(game, player) === 0 && (
              <Button
                onClick={() =>
                  addPlayerToGame({
                    game: { ...game, id },
                    player
                  })
                }
              >
                Join
              </Button>
            )}
          (
          <CurrentStep
            game={{ ...game, id }}
            playerNumber={getPlayerNumber(game, player)}
          />
          {getGameMoves(game, getPlayerNumber(game, player))
            .reverse()
            .map((move, idx) => (
              <GameStep move={move} key={idx} />
            ))}
        </Stack>
      </Layout>
    </>
  )
}
