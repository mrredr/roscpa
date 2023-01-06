export type Game = {
  bestof: number
  player1: {
    ref: { id: string }
    nickname: string
    log: string
  }
  player2?: {
    ref: { id: string }
    nickname: string
    log: string
  }
  status: 'start' | 'game' | 'end'
  id?: string
}
