import { render, screen } from '@testing-library/react'
import authHook from 'react-firebase-hooks/auth'

import App from './App'

jest.mock('shared/firebase.config', () => ({ firebaseConfig: {} }))
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn()
}))
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(),
}))
jest.mock('react-firebase-hooks/auth', () => ({
  useIdToken: jest.fn()
}))

describe('<App />', () => {
  const mockAuthHook = authHook as jest.MockedObject<any>

  beforeEach(() => {
    jest.resetAllMocks();
  })

  it('should open home page if user registred', async () => {
    mockAuthHook.useIdToken.mockImplementation(() => (['tok', false, null]))
    render(<App />)
    const LoginElement = screen.queryByText('Login form')
    const HomeElement = await screen.findByText('HOME')

    expect(LoginElement).not.toBeInTheDocument()
    expect(HomeElement).toBeInTheDocument()
  })

  it('should redirect to login page if open restricted page', async () => {
    mockAuthHook.useIdToken.mockImplementation(() => ([null, false, null]))
    render(<App />)
    const LoginElement = await screen.findByText('Login form')
    const HomeElement =  screen.queryByText('HOME')

    expect(LoginElement).toBeInTheDocument()
    expect(HomeElement).not.toBeInTheDocument()
  })
})
