import { FC, useCallback, useEffect, useState } from 'react'

import API, { UserListResponse } from '../../API'
import { UserList, UserListItemProps } from '../UserList'

const USERS_PER_PAGE = 10

type UserListPageProps = {
  // Callback to be called when the page is loaded
  onPageLoaded?: () => void
  className?: string
}

// we add delay just for demo purpose, otherwise this is not needed
const addDelay = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1500)
  })
}

// Formats the API response to the format expected by the UserList component
const formatUserListResponse = (response: UserListResponse): UserListItemProps[] => {
  return response.data.map((user) => ({
    id: user.id,
    avatarURL: user.avatar,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
  }))
}

const UserListPage: FC<UserListPageProps> = ({ onPageLoaded = () => {}, className = '' }) => {
  const [users, setUsers] = useState<UserListItemProps[]>([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [pagesLoaded, setPagesLoaded] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers(await loadPage(1))
      setPagesLoaded(1)
      onPageLoaded()
    }
    fetchUsers()
  }, [onPageLoaded])

  // Loads the next set of users
  const loadPage = async (page: number): Promise<UserListItemProps[]> => {
    setIsLoading(true)
    const [response] = await Promise.all([API.getUserList({ page, perPage: USERS_PER_PAGE }), addDelay()])
    setIsLoading(false)
    setTotalUsers(response.data.total)
    return formatUserListResponse(response.data)
  }

  // Once the list has scrolled to the bottom, load the next set of users
  const onScrollToBottom = useCallback(async () => {
    if (isLoading || users.length >= totalUsers) {
      return
    }
    const responseUsers = await loadPage(pagesLoaded + 1)
    setUsers([...users, ...responseUsers])
    setPagesLoaded(pagesLoaded + 1)
  }, [users, pagesLoaded, totalUsers, isLoading])

  return (
    <UserList
      users={users}
      className={className}
      onScrollToBottom={onScrollToBottom}
      showLoadingIndicator={isLoading}
    />
  )
}

export default UserListPage
