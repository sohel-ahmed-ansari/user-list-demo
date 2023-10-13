import { render, screen } from '@testing-library/react'

import { UserList, UserListItemProps } from './index'

describe('UserList', () => {
  const users: UserListItemProps[] = [
    {
      id: 1,
      avatarURL: 'https://example.com/avatar1.png',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      avatarURL: 'https://example.com/avatar2.png',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
    },
  ]

  it('renders a list of users', () => {
    render(<UserList users={users} className="test-class" />)
    const userElements = screen.getAllByRole('listitem')
    expect(userElements).toHaveLength(users.length)
  })

  it('calls onScrollToBottom when the list is scrolled to the bottom', () => {
    const onScrollToBottom = jest.fn()
    render(<UserList users={users} onScrollToBottom={onScrollToBottom} />)
    const userList = screen.getByRole('list')
    userList.scrollTop = userList.scrollHeight
    userList.dispatchEvent(new Event('scroll'))
    expect(onScrollToBottom).toHaveBeenCalled()
  })

  it('renders a loading indicator when showLoadingIndicator is true', () => {
    render(<UserList users={users} showLoadingIndicator className="test-class" />)
    const loadingIndicator = screen.getByRole('progressbar')
    expect(loadingIndicator).toBeInTheDocument()
  })
})
