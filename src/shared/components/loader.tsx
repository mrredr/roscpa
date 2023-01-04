import { Layout } from './layout'

export const Loader = () => {
  return (
    <Layout>
      <div className="flex animate-pulse space-x-2">
        <div className="h-3 w-3 rounded-full bg-gray-500"></div>
        <div className="h-3 w-3 rounded-full bg-gray-500"></div>
        <div className="h-3 w-3 rounded-full bg-gray-500"></div>
      </div>
    </Layout>
  )
}
