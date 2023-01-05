import { firestore } from 'app/App'
import { addDoc, collection, doc, DocumentData } from 'firebase/firestore'

export const createGame = ({
  player,
  bestof
}: {
  player: DocumentData
  bestof: number
}) => {
  return addDoc(collection(firestore, 'games'), {
    bestof,
    log: '',
    status: 'start',
    player1: {
      ref: doc(firestore, 'players/' + player.id),
      nickname: player.nickname
    }
  })
}
