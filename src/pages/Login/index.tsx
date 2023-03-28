import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { schemaLogin } from '../../schemas/schemas'
import { api } from '../../services/api'
import { UserData } from '../../types'

export default function LoginPage() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<Omit<UserData, 'name'>>({
    resolver: yupResolver(schemaLogin)
  })

  const { mutate } = useMutation((user: Omit<UserData, 'name'>) => api.loginUser(user), {
    onSuccess: () => {
      navigate('/home')
    },
    onError: (error: AxiosError<any>) => {
      if ((error as any).response.data?.error) {
        const errorData = Object.getOwnPropertyNames((error as any).response.data?.error)
          .filter((key) => key as keyof Omit<UserData, 'name'>)
          .map((key) => key as keyof Omit<UserData, 'name'>)

        errorData.map((elementData) => {
          setError(
            elementData,
            {
              type: 'manual',
              message: (error as any).response.data?.error[elementData]
            },
            {
              shouldFocus: true
            }
          )
        })
      }
    }
  })

  async function onSubmit(data: Omit<UserData, 'name'>) {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>

      <>
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" placeholder={errors.email?.message} {...register('email')} />
      </>

      <>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" placeholder={errors.password?.message} {...register('password')} />
      </>

      <button>Login</button>

      <p>
        Don't have an account yet?? <Link to="/register">Register!</Link>
      </p>
    </form>
  )
}
