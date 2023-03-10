import { Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import { firebaseAuth, PlayerContext } from 'app/App'
import { signOut } from 'firebase/auth'
import { useContext } from 'react'

export const Header = () => {
  const player = useContext(PlayerContext)

  return (
    <header className="text-gray-600">
      <div className="container mx-auto flex flex-wrap items-center justify-between p-5 md:flex-row">
        <Link
          as={RouterLink}
          className="text-xl font-semibold text-gray-800"
          to="/"
        >
          Rock Scissors Paper
        </Link>
        <div className="flex items-center">
          <div className="mr-4">Hello {player ? player.nickname : ''}</div>
          <Button className="self-end" onClick={() => signOut(firebaseAuth)}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
