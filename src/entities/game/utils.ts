import { Player } from 'app/App'
import { Game } from './model'

export const getPlayerNumber = (game: Game | null, player: Player | null) => {
  if (!game || !player) return 0
  if (game.player1.ref.id === player.id) return 1
  if (!game.player2) return 0
  if (game.player2.ref.id === player.id) return 2
  return 0
}

export const checkPlayerNextMove = (game: Game, playerNumber: number) => {
  if (!game.player2) {
    return false
  }
  if (
    game.player1.log.length <= game.player2.log.length &&
    playerNumber === 1
  ) {
    return true
  }
  if (
    game.player2.log.length <= game.player1.log.length &&
    playerNumber === 2
  ) {
    return true
  }
  return false
}
