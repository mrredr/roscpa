import { ReactNode } from 'react'

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen min-w-full items-center justify-center bg-gray-100 p-5">
    {children}
  </div>
)
