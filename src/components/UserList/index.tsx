import { FC } from 'react'

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
}

export const UserList: FC<UserListProps> = ({ users }) => {
  return (
    <ul className="user-list">
      {users.map((user) => (
        <UserListItem key={user.id} {...user} />
      ))}
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
