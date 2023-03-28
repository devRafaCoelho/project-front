import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { schemaUpdateUser } from '../../schemas/schemas'
import { api } from '../../services/api'
import { UserData } from '../../types'

export default function FormUser({ close }: { close: () => void }) {
  const { data } = useQuery('user-data', api.getUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue
  } = useForm<UserData>({
    resolver: yupResolver(schemaUpdateUser),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      newPassword: undefined,
      confirmNewPassword: undefined
    }
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation(api.updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('user-data')
      console.log('User updated successfully!')
      close()
    },
    onError: (error: AxiosError<any>) => {
      if ((error as any).response.data?.error) {
        const errorData = Object.getOwnPropertyNames((error as any).response.data?.error)
          .filter((key) => key as keyof UserData)
          .map((key) => key as keyof UserData)

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

  async function onSubmit(data: UserData) {
    console.log(data)

    mutate(data)
  }

  useEffect(() => {
    if (data) {
      setValue('name', data.name)
      setValue('email', data.email)
    }
  }, [data])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Update User</h1>

        <>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" placeholder={errors.name?.message} {...register('name')} />
        </>

        <>
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" placeholder={errors.email?.message} {...register('email')} />
        </>

        <>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder={errors.password?.message} {...register('password')} />
        </>

        <>
          <label htmlFor="newPassword">newPassword</label>
          <input id="newPassword" type="password" placeholder={errors.newPassword?.message} {...register('newPassword')} />
        </>

        <>
          <label htmlFor="confirmNewPassword">confirmNewPassword</label>
          <input id="confirmNewPassword" type="password" placeholder={errors.confirmNewPassword?.message} {...register('confirmNewPassword')} />
        </>

        <button>Update</button>
      </form>
      <button onClick={close}>X</button>
    </>
  )
}
