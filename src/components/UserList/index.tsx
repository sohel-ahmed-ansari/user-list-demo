import { FC, UIEvent } from 'react'

import './styles.scss'

export type UserListItemProps = {
  id: number
  avatarURL: string
  firstName: string
  lastName: string
  email: string
}

type UserListProps = {
  users: UserListItemProps[]
  onScrollToBottom?: () => void
  showLoadingIndicator?: boolean
  className: string
}

export const UserList: FC<UserListProps> = ({
  users,
  showLoadingIndicator,
  onScrollToBottom = () => {},
  className,
}) => {
  const onListScroll = (e: UIEvent<HTMLUListElement>) => {
    const currentTarget = e.currentTarget
    const bottom = currentTarget.scrollHeight - currentTarget.scrollTop === currentTarget.clientHeight
    if (bottom) {
      onScrollToBottom()
    }
  }

  return (
    <ul className={`${className} user-list`} onScroll={onListScroll}>
      {users.map((user) => (
        <UserListItem key={user.id} {...user} />
      ))}
      {showLoadingIndicator && <LoadingItem />}
    </ul>
  )
}

export const UserListItem: FC<UserListItemProps> = ({ avatarURL, firstName, lastName, email }) => {
  const name = `${firstName} ${lastName}`
  return (
    <li className="user-list-item">
      <div className="user-list-item__avatar">
        <img src={avatarURL} alt={name} />
      </div>
      <div className="user-list-item__info">
        <div className="user-list-item__name">{name}</div>
        <div className="user-list-item__email">{email}</div>
      </div>
    </li>
  )
}

const LoadingItem: FC = () => {
  return (
    <li className="loading-item">
      <div className="loading-item__dot"></div>
      <div className="loading-item__dot"></div>
      <div className="loading-item__dot"></div>
    </li>
  )
}
