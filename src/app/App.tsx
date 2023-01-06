import { Pages } from 'pages'
import { BrowserRouter as Router } from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useIdToken } from 'react-firebase-hooks/auth'

import { firebaseConfig } from 'shared/firebase.config'
import { ErrorBoundary } from './ErrorBoundary'
import { createContext, useEffect, useState } from 'react'

import { Loader } from 'shared/components/loader'
import { getAuth, User } from 'firebase/auth'
import { GeneralErrorPage } from 'pages/error'
import { getFirestore } from 'firebase/firestore'
import { getPlayer } from 'entities/player/api'

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
export const firestore = getFirestore(firebaseApp)

export const UserContext = createContext<User | null | undefined>(undefined)
export type Player = {
  nickname: string
  userId: string
  id: string
}
export const PlayerContext = createContext<Player | null>(null)

function App() {
  const [user, loadingUser, error] = useIdToken(firebaseAuth)
  const [player, setPlayer] = useState<Player | null>(null)

  useEffect(() => {
    if (user) {
      getPlayer(user).then((data) => {
        setPlayer({ ...data.docs[0].data(), id: data.docs[0].id } as Player)
      })
    }
  }, [user])

  if (loadingUser || (user && !loadingUser && !player)) return <Loader />

  if (error) return <GeneralErrorPage />

  return (
    <ErrorBoundary>
      <Router>
        <UserContext.Provider value={user}>
          <PlayerContext.Provider value={player}>
            <ChakraProvider>
              <Pages />
            </ChakraProvider>
          </PlayerContext.Provider>
        </UserContext.Provider>
      </Router>
    </ErrorBoundary>
  )
}

export default App
