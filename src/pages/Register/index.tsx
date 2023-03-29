import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../../components/Input'
import { schemaRegister } from '../../schemas/schemas'
import { api } from '../../services/api'
import { Button } from '../../styles/Button'
import '../../styles/styles'
import { Container, Form } from '../../styles/styles'
import { Text } from '../../styles/Typography'
import { UserData } from '../../types'

export default function RegisterPage() {
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm<UserData>({
    resolver: yupResolver(schemaRegister),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const { mutate } = useMutation(api.registerUser, {
    onSuccess: () => {
      navigate('/login')
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

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Text type="title" size="exl" color="black" position="center">
          Cadastre-se!
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

        <Button type="submit" size="lrg" background="blue" color="white">
          Concluir
        </Button>

        <Text type="paragraph" size="rgl" color="black" position="center">
          Já tem cadastro? <Link to="/login">Faça seu LogIn!</Link>
        </Text>
      </Form>
    </Container>
  )
}
