import axios from 'axios'

export type UserListResponse = {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
  }[]
}

const API = {
  getUserList: ({ page, perPage }: { page: number; perPage: number }) => {
    return axios.get<UserListResponse>('https://reqres.in/api/users', { params: { page, per_page: perPage } })
  },
}
export default API
