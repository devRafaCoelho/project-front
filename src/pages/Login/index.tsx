import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../../components/Input'
import { schemaLogin } from '../../schemas/schemas'
import { api } from '../../services/api'
import { Button } from '../../styles/Button'
import { Container, Form } from '../../styles/styles'
import { Text } from '../../styles/Typography'
import { UserData } from '../../types'

export default function LoginPage() {
  const navigate = useNavigate()

  const {
    control,
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
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Text type="title" size="exl" color="black" position="center">
          Faça seu Login!
        </Text>

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

        <Button type="submit" size="lrg" background="blue" color="white">
          Login
        </Button>

        <Text type="paragraph" size="rgl" color="black" position="center">
          Ainda não tem uma conta? <Link to="/register">Cadastre-se!</Link>
        </Text>
      </Form>
    </Container>
  )
}
