import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { firestore } from 'app/App'
import { User, UserCredential } from 'firebase/auth'

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

export const getPlayer = (user: User) => {
  return getDocs(
    query(collection(firestore, 'players'), where('userId', '==', user.uid))
  )
}
