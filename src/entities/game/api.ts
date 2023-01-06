import { firestore, Player } from 'app/App'
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  updateDoc
} from 'firebase/firestore'
import { Game } from './type'

export const createGame = ({
  player,
  bestof
}: {
  player: DocumentData
  bestof: number
}) => {
  return addDoc(collection(firestore, 'games'), {
    bestof,
    status: 'start',
    player1: {
      ref: doc(firestore, 'players/' + player.id),
      nickname: player.nickname,
      log: ''
    }
  })
}

export const addPlayerToGame = ({
  game,
  player
}: {
  game: Game
  player: Player
}) => {
  const gameRef = doc(firestore, 'games/' + game.id)

  return updateDoc(gameRef, {
    player2: {
      nickname: player.nickname,
      log: '',
      ref: doc(firestore, 'players/' + player.id)
    },
    status: 'game'
  })
}

export const makeMoveInGame = ({
  game,
  playerNumber,
  move
}: {
  game: Game
  playerNumber: 1 | 2 | 0
  move: 's' | 'p' | 'r'
}) => {
  if (playerNumber === 0) throw new Error('Wrong player')
  const gameRef = doc(firestore, 'games/' + game.id)

  const playerIndex = playerNumber === 1 ? 'player1' : 'player2'

  return updateDoc(gameRef, {
    [playerIndex]: {
      ...game[playerIndex],
      log: game[playerIndex]?.log + move
    },
    status: 'game'
  })
}

export const updateGameStatus = ({
  game,
  status
}: {
  game: Game
  status: string
}) => {
  const gameRef = doc(firestore, 'games/' + game.id)

  return updateDoc(gameRef, {
    status
  })
}
