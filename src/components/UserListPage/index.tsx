import { FC, useEffect, useState } from 'react'

import API, { UserListResponse } from '../../API'
import { UserList, UserListItemProps } from '../UserList'

const USERS_PER_PAGE = 8

type UserListPageProps = {
  onPageLoaded?: () => void
}

const formatUserListResponse = (response: UserListResponse): UserListItemProps[] => {
  return response.data.map((user) => ({
    id: user.id,
    avatarURL: user.avatar,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
  }))
}

const UserListPage: FC<UserListPageProps> = ({ onPageLoaded = () => {} }) => {
  const [users, setUsers] = useState<UserListItemProps[]>([])
  const [pagesLoaded, setPagesLoaded] = useState(0)
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await API.getUserList({ page: 1, perPage: USERS_PER_PAGE })
      const formattedResponse = formatUserListResponse(response.data)
      setUsers(formattedResponse)
      setPagesLoaded(1)
      onPageLoaded()
    }
    fetchUsers()
  }, [onPageLoaded])

  return <UserList users={users} />
}

export default UserListPage
