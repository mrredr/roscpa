import { render, screen } from '@testing-library/react'
import authHook from 'react-firebase-hooks/auth'

import App from './App'

jest.mock('shared/firebase.config', () => ({ firebaseConfig: {} }))
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn()
}))
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn()
}))
jest.mock('firebase/firestore', () => ({
  collection: 'some',
  addDock: jest.fn().mockResolvedValue(''),
  getFirestore: jest.fn()
}))
jest.mock('react-firebase-hooks/auth', () => ({
  useIdToken: jest.fn(),
  useSignInWithEmailAndPassword: () => [jest.fn(), null, null, null]
}))

describe('<App />', () => {
  const mockAuthHook = authHook as jest.MockedObject<any>

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should open home page if user registred', async () => {
    mockAuthHook.useIdToken.mockImplementation(() => ['tok', false, null])
    render(<App />)
    const LoginElement = screen.queryByText('Sign in')
    const LogoutElement = await screen.findByText('Logout')

    expect(LoginElement).not.toBeInTheDocument()
    expect(LogoutElement).toBeInTheDocument()
  })

  it('should redirect to sign in page if open restricted page', async () => {
    mockAuthHook.useIdToken.mockImplementation(() => [null, false, null])
    render(<App />)
    const LoginElement = await screen.findByText('Sign in')
    const LogoutElement = screen.queryByText('Logout')

    expect(LoginElement).toBeInTheDocument()
    expect(LogoutElement).not.toBeInTheDocument()
  })
})
