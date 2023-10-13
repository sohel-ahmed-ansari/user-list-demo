import { FC } from 'react'

import './styles.scss'

type UserListItemProps = {
  avatarURL: string
  name: string
}

type UserListProps = {
  users: UserListItemProps[]
}

export const UserList: FC<UserListProps> = ({ users }) => {
  return (
    <ul className="user-list">
      {users.map((user) => (
        <UserListItem {...user} />
      ))}
    </ul>
  )
}

export const UserListItem: FC<UserListItemProps> = ({ avatarURL, name }) => {
  return (
    <li className="user-list-item">
      <div className="user-list-item__avatar">
        <img src={avatarURL} alt={name} />
      </div>
      <div className="user-list-item__name">{name}</div>
    </li>
  )
}
