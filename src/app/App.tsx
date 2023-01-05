import { Pages } from 'pages'
import { BrowserRouter } from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useIdToken } from 'react-firebase-hooks/auth'

import { firebaseConfig } from 'shared/firebase.config'
import { ErrorBoundary } from './ErrorBoundary'
import { createContext } from 'react'

import { Loader } from 'shared/components/loader'
import { getAuth, User } from 'firebase/auth'
import { GeneralErrorPage } from 'pages/error'
import { getFirestore } from 'firebase/firestore'

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
export const firestore = getFirestore(firebaseApp)

export const AuthContext = createContext<User | null | undefined>(undefined)

function App() {
  const [user, loading, error] = useIdToken(firebaseAuth)

  if (loading) return <Loader />

  if (error) return <GeneralErrorPage />

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthContext.Provider value={user}>
          <ChakraProvider>
            <Pages />
          </ChakraProvider>
        </AuthContext.Provider>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
