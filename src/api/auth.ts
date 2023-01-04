import { fireabseApp } from 'app/App'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export const getIdToken = () => {
  const auth = getAuth(fireabseApp)
  const user = auth.currentUser
console.log('use', auth, auth.currentUser)
  if (user) {
    return user.getIdToken()
  } else {
    return Promise.resolve(null)
  }
}

export const signInEmailPassword = ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      // TODO:: add to user auth context and to LS
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      // ..
    })
}

export const signOut = () => {
  const auth = getAuth()
  signOut(auth)
    .then(() => {
      // TODO:: remove from context and LS
    })
    .catch((error) => {
      // An error happened.
    })
}
