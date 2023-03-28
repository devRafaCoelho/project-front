import axios from 'axios'
import { Comment, UserData } from '../types'
import { getItem, setItem } from '../utils/storage'

const URL = 'http://localhost:3000'

async function registerUser(user: UserData): Promise<UserData> {
  const response = await axios.post(`${URL}/register`, user)
  return response.data
}

async function loginUser(user: Omit<UserData, 'name'>): Promise<Omit<UserData, 'name'>> {
  const response = await axios.post(`${URL}/login`, user)

  const { token } = response.data
  setItem('token', token)

  const { id } = response.data.user
  setItem('userId', id)

  return response.data
}

async function getUser(): Promise<UserData> {
  const response = await axios.get(`${URL}/user`, {
    headers: {
      Authorization: `Bearer ${getItem('token')}`
    }
  })

  return response.data
}

async function updateUser(user: UserData): Promise<UserData> {
  const response = await axios.put<UserData>(
    `${URL}/user`,
    { name: user.name, email: user.email, password: user.password },
    {
      headers: {
        Authorization: `Bearer ${getItem('token')}`
      }
    }
  )

  return response.data
}

async function getComments(): Promise<Comment[]> {
  const response = await axios.get<Comment[]>(`${URL}/comments`, {
    headers: {
      Authorization: `Bearer ${getItem('token')}`
    }
  })

  return response.data
}

async function registerComment(comment: string): Promise<Comment> {
  const response = await axios.post<Comment>(`${URL}/comments`, comment, {
    headers: {
      Authorization: `Bearer ${getItem('token')}`
    }
  })

  return response.data
}

async function updateComment(id: number, description: string): Promise<Comment> {
  const response = await axios.put<Comment>(
    `${URL}/comments/${id}`,
    { description },
    {
      headers: {
        Authorization: `Bearer ${getItem('token')}`
      }
    }
  )

  return response.data
}

async function deleteComment(id: number): Promise<Comment> {
  const response = await axios.delete<Comment>(`${URL}/comments/${id}`, {
    headers: {
      Authorization: `Bearer ${getItem('token')}`
    }
  })

  return response.data
}

export const api = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  getComments,
  registerComment,
  updateComment,
  deleteComment
}
