import { FC } from 'react'

import './styles.scss'

type HeaderProps = {
  title: string
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <div className="header">
      <div>{title}</div>
    </div>
  )
}
export default Header
