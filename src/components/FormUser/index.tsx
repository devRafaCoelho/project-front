import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { schemaUpdateUser } from '../../schemas/schemas'
import { api } from '../../services/api'
import { Button } from '../../styles/Button'
import { Container, Form } from '../../styles/styles'
import { Text } from '../../styles/Typography'
import { UserData } from '../../types'
import { Input } from '../Input'
import { CgClose } from 'react-icons/cg'

export default function FormUser({ close }: { close: () => void }) {
  const { data } = useQuery('user-data', api.getUser)

  const {
    control,
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
    mutate(data)
  }

  useEffect(() => {
    if (data) {
      setValue('name', data.name)
      setValue('email', data.email)
    }
  }, [data])

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Text type="title" size="exl" color="black" position="center">
          Atualize seus dados!
        </Text>

        <Input
          type="text"
          name="name"
          control={control}
          placeholder={errors?.name?.message || 'Nome'}
        />

        <Input
          type="text"
          name="email"
          control={control}
          placeholder={errors?.email?.message || 'Email'}
        />

        <Input
          type="password"
          name="password"
          control={control}
          placeholder={errors?.password?.message || 'Senha'}
        />

        <Input
          type="password"
          name="newPassword"
          control={control}
          placeholder={errors?.newPassword?.message || 'Nova Senha (opcional)'}
        />

        <Input
          type="password"
          name="confirmNewPassword"
          control={control}
          placeholder={errors?.confirmNewPassword?.message || 'Confirmar Nova Senha (opcional)'}
        />

        <Button type="submit" size="lrg" background="blue" color="white">
          Concluir
        </Button>
        <CgClose
          onClick={close}
          style={{
            width: '24px',
            height: '24px',
            position: 'absolute',
            top: '30px',
            right: '30px',
            cursor: 'pointer'
          }}
        />
      </Form>
    </Container>
  )
}
