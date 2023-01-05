import { Header } from 'shared/components/header'
import { Layout } from 'shared/components/layout'
import { Games } from './components/games'

export const HomePage = () => {
  return (
    <>
      <Header />
      <Layout className="!items-start">
        <Games />
      </Layout>
    </>
  )
}
