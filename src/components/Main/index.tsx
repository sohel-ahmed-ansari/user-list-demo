import { FC, PropsWithChildren } from 'react'

import './styles.scss'

const Main: FC<PropsWithChildren> = ({ children }) => {
  return <main className="main">{children}</main>
}

export default Main
