import { updateGameStatus } from './api'
import { Game } from './type'

export const GAME_STATUS = {
  START: 'start',
  GAME: 'game',
  END: 'end'
}

export const fullStepName = {
  r: 'rock',
  s: 'scissors',
  p: 'paper'
}

export type Move = 's' | 'r' | 'p'

export const GameResults = {
  rs: 1,
  sr: -1,
  sp: 1,
  ps: -1,
  pr: 1,
  rp: -1,
  ss: 0,
  rr: 0,
  pp: 0
}

export const GAME_RESULTS = {
  WON: 'You won',
  DRAWN: 'Nobody won',
  LOST: 'You lost'
}

export const getStepResult = (g1: Move, g2: Move, myNumber: number) => {
  if (myNumber === 1) {
    if (GameResults[`${g1}${g2}`] === 1) return GAME_RESULTS.WON
    if (GameResults[`${g1}${g2}`] === -1) return GAME_RESULTS.LOST
  }

  if (myNumber === 2) {
    if (GameResults[`${g1}${g2}`] === 1) return GAME_RESULTS.LOST
    if (GameResults[`${g1}${g2}`] === -1) return GAME_RESULTS.WON
  }

  if (GameResults[`${g1}${g2}`] === 0) return GAME_RESULTS.DRAWN
  return GAME_RESULTS.DRAWN
}

export const getGameStat = (game: Game | null, playerNumber: number) => {
  if (!game || playerNumber === 0) return [0, 0, 0]
  const moves = getGameMoves(game, playerNumber)
  let [won, drawn, lost] = [0, 0, 0]
  moves.forEach((move) => {
    if (move.result === GAME_RESULTS.WON) won++
    if (move.result === GAME_RESULTS.LOST) lost++
    if (move.result === GAME_RESULTS.DRAWN) drawn++
  })

  return [won, drawn, lost]
}

export const MOVE_STATUS = {
  WAIT: 'wait',
  PLAY: 'play',
  WON: 'won',
  DRAWN: 'drawn',
  LOST: 'lost'
}

export const getCurrentMoveStatus = (game: Game, playerNumber: number) => {
  if (game.player2 === undefined) return MOVE_STATUS.WAIT
  const [won, drawn, lost] = getGameStat(game, playerNumber)
  const bestof = (game.bestof - drawn) / 2
  const isGameWon = won > bestof
  const isGameLost = lost > bestof
  const isGameDrawn = won === bestof && lost === bestof

  if (
    (isGameLost || isGameWon || isGameDrawn) &&
    game.status !== GAME_STATUS.END
  ) {
    updateGameStatus({ game, status: GAME_STATUS.END })
  }

  if (isGameWon) return MOVE_STATUS.WON
  if (isGameLost) return MOVE_STATUS.LOST
  if (isGameDrawn) return MOVE_STATUS.DRAWN

  if (game.player1.log.length === game.player2.log.length)
    return MOVE_STATUS.PLAY
  if (game.player1.log.length < game.player2.log.length && playerNumber === 1) {
    return MOVE_STATUS.PLAY
  }
  if (game.player1.log.length > game.player2.log.length && playerNumber === 2) {
    return MOVE_STATUS.PLAY
  }
  return MOVE_STATUS.WAIT
}

export const getGameMoves = (game: Game, playerNumber: number) => {
  if (game.player2 === undefined) return []
  const stepsLength = Math.min(game.player1.log.length, game.player2.log.length)
  const result = Array(stepsLength).fill(0)
  return result.map((item, idx) => {
    const g1 = game.player1.log[idx] as Move
    const g2 = game.player2?.log[idx] as Move
    const titleText = fullStepName[g1] + ' VS ' + fullStepName[g2]
    const resultText = getStepResult(g1, g2, playerNumber)

    return {
      title: titleText,
      result: resultText,
      idx
    }
  })
}
