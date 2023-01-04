import { Link } from '@chakra-ui/react'
import { Layout } from 'shared/components/layout'
import { Link as RouterLink } from 'react-router-dom'

export const NotFoundErrorPage = () => {
  return (
    <Layout>
      <div className='text-center'>
        Page not found
        <br />
        <Link as={RouterLink} to="/">
          Go to home page
        </Link>
      </div>
    </Layout>
  )
}

export const GeneralErrorPage = () => {
  return <Layout>Something went wrong</Layout>
}
