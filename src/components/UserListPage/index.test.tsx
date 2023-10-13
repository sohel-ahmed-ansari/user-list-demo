import { render, screen } from '@testing-library/react'

import UserListPage from './index'

describe('UserListPage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should render a list of users', async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          avatar: 'https://example.com/avatar1.png',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
        },
        {
          id: 2,
          avatar: 'https://example.com/avatar2.png',
          first_name: 'Jane',
          last_name: 'Doe',
          email: 'jane.doe@example.com',
        },
      ],
      total: 2,
    }
    jest.mock('../../API', () => {
      return {
        getUserList: jest.fn().mockResolvedValueOnce(mockResponse),
      }
    })

    render(<UserListPage />)
    await screen.findByText('John Doe')
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('jane.doe@example.com')).toBeInTheDocument()
  })
})
