import { collection, addDoc } from 'firebase/firestore'
import { firestore } from 'app/App'
import { UserCredential } from 'firebase/auth'

export const createPlayer = ({
  nickname,
  user
}: {
  nickname: string
  user: UserCredential
}) => {
  return addDoc(collection(firestore, 'players'), {
    nickname,
    userId: user.user.uid
  })
}
