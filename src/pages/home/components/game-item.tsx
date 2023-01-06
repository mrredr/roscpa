import { Button, Card, CardBody, Heading } from '@chakra-ui/react'

import { Player, PlayerContext } from 'app/App'
import { addPlayerToGame } from 'entities/game/api'
import { GAME_STATUS } from 'entities/game/model'
import { Game } from 'entities/game/type'
import { checkPlayerNextMove, getPlayerNumber } from 'entities/game/utils'
import { DocumentData } from 'firebase/firestore'
import React, { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export const GameItem = React.memo(function GameItem({
  gameData
}: {
  gameData: DocumentData
}) {
  const navigate = useNavigate()
  const game: Game = gameData.data()
  const player = useContext(PlayerContext) as Player
  const playerNumber = useMemo(
    () => getPlayerNumber(game, player),
    [game, player]
  )
  const isMyNextMove = useMemo(
    () => checkPlayerNextMove(game, playerNumber),
    [game, playerNumber]
  )

  return (
    <Card className="!bg-white">
      <CardBody>
        <Heading size="xs">
          {game.player1?.nickname} VS {game.player2?.nickname}
        </Heading>
        {game.status === GAME_STATUS.START && (
          <div className="flex flex-row items-center justify-between">
            Waiting for opponent&nbsp;
            {playerNumber === 0 && (
              <Button
                onClick={() =>
                  addPlayerToGame({
                    game: { ...game, id: gameData.id },
                    player
                  }).then(() => navigate('/games/' + gameData.id))
                }
              >
                Join
              </Button>
            )}
          </div>
        )}
        {game.status === GAME_STATUS.GAME && (
          <div className="flex flex-row items-center justify-between">
            {isMyNextMove ? 'Your move ' : "Opponent's move "}
            <Button onClick={() => navigate('/games/' + gameData.id)}>
              Open
            </Button>
          </div>
        )}
        {game.status === GAME_STATUS.END && (
          <div className="flex flex-row items-center justify-between">
            Game finished&nbsp;
            <Button onClick={() => navigate('/games/' + gameData.id)}>
              Open
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  )
})
