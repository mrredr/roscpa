import { Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { Layout } from 'shared/components/layout'

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
