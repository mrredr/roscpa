import { ReactNode } from 'react'
import { classNames } from 'utils'

export const Layout = ({
  children,
  className
}: {
  children?: ReactNode
  className?: string
}) => (
  <div
    className={classNames(
      'flex min-h-screen min-w-full items-center justify-center bg-gray-100 p-5',
      className
    )}
  >
    {children}
  </div>
)
